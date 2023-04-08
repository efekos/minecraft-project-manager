import { Uri, commands, window, workspace } from "vscode";
import { Datapack, World, WorldsProvider } from "../class/WorldsProvider";
import { join } from "path";
import { mkdirSync, rm, writeFile } from "fs";
import { notifications } from "../class/NotificationProvider";

export default async (provider: WorldsProvider, world: World<Datapack>) => {
    {
        //Gets a name for the pack
        const name = await window.showInputBox({ title: 'Enter Pack Name:', placeHolder: 'main', ignoreFocusOut: false });
        if (!name) { return notifications.sendErrorMessage("You must give a name.", 'worlds.packCreateErr.nameRequired'); }
        if (name.toLowerCase() !== name || name.includes(' ')) { return notifications.sendErrorMessage("Name can't include spaces.", 'worlds.packCreateErr.nameSpaces'); }

        // makes a datapack dir from the pack name
        const dir = join(world.data.datapacksDirectory, name);

        //Error handling stuff
        const errs: NodeJS.ErrnoException[] = [];
        function onErr(error: NodeJS.ErrnoException | null) {
            if (error) { errs.push(error); };
        }

        await mkdirSync(dir); //main dir
        await mkdirSync(`${dir}\\data\\${name}\\functions`, { recursive: true }); // recursive will create every sub folder
        await mkdirSync(`${dir}\\data\\minecraft\\tags\\functions`, { recursive: true }); //recursive stuff too
        await writeFile(`${dir}\\pack.mcmeta`, JSON.stringify({ //pack.mcmeta
            pack: {
                pack_format: workspace.getConfiguration('minecraftProjectManager').get('worlds.defaultPackFormat'),//default format
                description: workspace.getConfiguration('minecraftProjectManager').get('worlds.defaultPackDescription')//default desc
            }
        }, undefined, 2), onErr); // pack.mcmeta end

        //other file stuff
        await writeFile(`${dir}\\data\\minecraft\\tags\\functions\\tick.json`, JSON.stringify({ values: [`${name}:tick`] }, undefined, 2), onErr);//tick tags
        await writeFile(`${dir}\\data\\minecraft\\tags\\functions\\load.json`, JSON.stringify({ values: [`${name}:load`] }, undefined, 2), onErr);//load tags
        await writeFile(`${dir}\\data\\${name}\\functions\\load.mcfunction`, 'say loadworks', onErr);//load function
        await writeFile(`${dir}\\data\\${name}\\functions\\tick.mcfunction`, 'say tickworks', onErr);//tick functipn

        // sending a noti
        if (errs.length > 0) {
            await rm(dir, onErr);
            notifications.sendErrorMessage(`Couldn't create the datapack: ${errs.length > 1 ? errs[0] : errs}`, 'worlds.packCreateErr.fsProblem');
        } else {
            notifications.sendInformationMessage('Successfully created a datapack!', 'worlds.packCreate', 'Open').then(value => {
                if (value === "Open") {
                    //open folder if user wants
                    commands.executeCommand('vscode.openFolder', Uri.file(dir));
                }
            });
        }
        //refresh to see changes
        provider.refresh();
    }
};