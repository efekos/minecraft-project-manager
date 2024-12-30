import { existsSync, readdirSync, stat } from 'fs';
import { Uri } from 'vscode';
import { join } from 'path';
import { notifications } from './NotificationProvider';

export class UtilFunctions {
    public static getExtension(filename: string) {
        return filename.split('.').pop();
    }

    public static getIconPaths(icon: string) {
        return {
            light: Uri.file(join(__filename, '..', '..', 'images', 'icons', 'light', `${icon}.svg`)),
            dark: Uri.file(join(__filename, '..', '..', 'images', 'icons', 'dark', `${icon}.svg`))
        };
    }

    public static makeNameGrammar(filename: string) {
        return filename // function_name.mcfunction ☹️
            .split('_') // [function,name.mcfunction]
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

    public static isAfolder(dir: string): boolean {
        if (!existsSync(dir)) { return false; };
        stat(dir, (e, s) => {
            return s.isDirectory();
        });

        return false;
    }
    public static isAfile(dir: string) {
        return existsSync(dir) && stat(dir, (e, s) => s.isFile());
    }

    public static getFiles(dir: string, extension: string): string[] {
        const finalPaths: string[] = [];

        function a(dirr: string) {
            readdirSync(dirr).forEach(file => {
                const newDir = join(dirr, file);

                if (file.endsWith('.nbt')) {
                    finalPaths.push(newDir);
                } else {
                    a(newDir);
                }
            });

        }

        a(dir);
        return finalPaths.map(r => r.replace(dir, '').slice(1));
    }
}