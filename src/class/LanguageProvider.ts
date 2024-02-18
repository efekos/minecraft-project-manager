import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import axios from "axios";

var locale:Record<string,string> = {};

function loadNamespace(dir:string,code:string = 'en_us'){
    if(!existsSync(join(dir,'lang'))){return;}
    const files = readdirSync(join(dir,'lang')).filter(r=>r.endsWith('.json'));
    if(!files.includes(`${code}.json`)){return;}

    const json = JSON.parse(readFileSync(join(dir,'lang',`${code}.json`)).toString()) as Record<string,string>;

    locale = {...locale,...json}; 
}

function loadPack(dir:string){
    if(!existsSync(join(dir,'assets'))) {return;}
    const namespaces = readdirSync(join(dir,'assets'));

    namespaces.forEach(namespace=>loadNamespace(join(dir,namespace)));
}

async function loadVanilla(code:string = 'en_us'){
    const url = `https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/lang/${code}.json`;

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            locale = { ...locale, ...response.data };
        }
    } catch (error) {
        console.error("Error loading language file:", error);
    }
}

export namespace lang {

    export async function load(dir:string,code:string = 'en_us'){
        locale = {};

        await loadVanilla(code);
        
        if(!existsSync(dir)){return;}
        const packs = readdirSync(dir);
        await packs.forEach(pack=>loadPack(join(dir,pack)));

        console.log("Successfully loaded the following locale data: ",locale);
    }

    export function get(key:string):string{
        return key in locale ? locale[key] : key;
    }
}