import { existsSync } from "fs";
import { MConfig } from "./CurrentPackProvider";
import { notifications } from "./NotificationProvider";
import { join } from "path";

export class UtilFunctions {
    public static getExtension(filename: string) {
        return filename.split(".").pop();
    }

    public static getIconPaths(icon: string) {
        return {
            light: join(__filename, '..', '..', 'images', 'icons', 'light', `${icon}.svg`),
            dark: join(__filename, '..', '..', 'images', 'icons', 'dark', `${icon}.svg`)
        };
    }

    public static makeNameGrammar(filename: string) {
        return filename // function_name.mcfunction ☹️
            .split("_") // [function,name.mcfunction]
            .map(r => r[0].toUpperCase() + r.slice(1)) // [Function,Name.mcfunction]
            .join(' ') // Function Name.mcfunction
            .replace('.json', '')
            .replace('.nbt', '')
            .replace('.mcfunction', ''); // Function Name 😎
        //! Works good as long as you don't name your functions wrong (functionname,fncname etc.)
    }

    public static revertGrammaredName(filename: string) {
        return filename // Function Name
            .split(' ') // [Function,Name]
            .map(r => r.toLowerCase()) // [function,name]
            .join('_'); // function_name
        //! Works good as long as you don't give a wrong name (FunctionName,fncnm etc.)
    }

    public static confirmValidMConfig(root: string, data: any): boolean {
        if (!data.data) { // if mconfig does not contain data
            notifications.sendErrorMessage('Current mconfig is invalid: You must provide a data folder to mconfig', 'mconfig.invalid.DataRequired');
            return false;
        }
        if (!existsSync(join(root, data.data))) { // if data folder in mconfig does not exists
            notifications.sendErrorMessage('Current mconfig is invalid: given data folder does not exists', 'mconfig.invalid.Data');
            return false;
        }
        return true;
    }
}