import { window } from "vscode";
import { Datapack, World, WorldsProvider } from "../class/WorldsProvider";
import { join } from "path";
import { mkdirSync, writeFile } from "fs";

export default async (provider: WorldsProvider, world: World<Datapack>) => {
    {
        const name = await window.showInputBox({ title: 'Enter Pack Name:', placeHolder: 'main', ignoreFocusOut: false });
        if (!name) { return window.showErrorMessage("You must give a name."); }
        if (name.toLowerCase() !== name || name.includes(' ')) { return window.showErrorMessage("Name can't include spaces."); }

        const dir = join(world.data.datapacksDirectory, name);
        const errs = [];
        function onErr(error: NodeJS.ErrnoException | null) {
            if (error) { window.showErrorMessage(`Couldn't create the datapack : ${error}`); };
        }

        await mkdirSync(dir); //ana dir
        await mkdirSync(`${dir}\\data\\${name}\\functions`, { recursive: true }); // dirler1
        await mkdirSync(`${dir}\\data\\minecraft\\tags\\functions`, { recursive: true }); //dirler2
        await writeFile(`${dir}\\pack.mcmeta`, JSON.stringify({ //pack.mcmeta
            pack: {
                pack_format: 9,
                description: "pack"
            }
        }, undefined, 2), onErr); // pack.mcmeta
        await writeFile(`${dir}\\data\\minecraft\\tags\\functions\\tick.json`, JSON.stringify({ values: [`${name}:tick`] }, undefined, 2), onErr);//tick tags
        await writeFile(`${dir}\\data\\minecraft\\tags\\functions\\load.json`, JSON.stringify({ values: [`${name}:load`] }, undefined, 2), onErr);//load tags
        await writeFile(`${dir}\\data\\${name}\\functions\\load.mcfunction`, 'say loadworks', onErr);//load tags
        await writeFile(`${dir}\\data\\${name}\\functions\\tick.mcfunction`, 'say tickworks', onErr);//load tags

        provider.refresh();
    }
};