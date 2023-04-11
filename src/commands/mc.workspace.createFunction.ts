import { Uri, commands, window } from "vscode";
import { CurrentPackProvider, PackItem } from "../class/CurrentPackProvider";
import { notifications } from "../class/NotificationProvider";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { UtilFunctions } from "../class/UtilFunctions";
import { join } from "path";

export default async (provider: CurrentPackProvider, func: PackItem) => {
    const name = await window.showInputBox({ title: 'Enter a Function Name', placeHolder: 'My New Function' });
    if (!name || name === undefined) { return; };
    const dir = join(func.dir, UtilFunctions.revertGrammaredName(name)+".mcfunction");

    if (!existsSync(func.dir)) { mkdirSync(func.dir, { recursive: true }); };

    await writeFileSync(dir, '');
    commands.executeCommand('vscode.open', Uri.file(dir));
    provider.refresh();
};