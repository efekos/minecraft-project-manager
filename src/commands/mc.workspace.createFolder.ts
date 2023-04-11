import { Uri, commands, window } from "vscode";
import { CurrentPackProvider, PackItem } from "../class/CurrentPackProvider";
import { notifications } from "../class/NotificationProvider";
import { mkdirSync, writeFileSync } from "fs";
import { UtilFunctions } from "../class/UtilFunctions";
import { join } from "path";

export default async (provider: CurrentPackProvider, func: PackItem) => {
    const name = await window.showInputBox({ title: 'Enter a Folder Name', placeHolder: 'My New Folder' });
    if (!name || name === undefined) { return; };
    const dir = join(func.dir, UtilFunctions.revertGrammaredName(name));

    await mkdirSync(dir,{recursive:true});
    commands.executeCommand('vscode.open', Uri.file(dir));
    provider.refresh();
};