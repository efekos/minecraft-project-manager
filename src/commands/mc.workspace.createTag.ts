import { Uri, commands, window } from "vscode";
import { CurrentPackProvider, PackItem } from "../class/CurrentPackProvider";
import { notifications } from "../class/NotificationProvider";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { UtilFunctions } from "../class/UtilFunctions";
import { join } from "path";

export default async (provider: CurrentPackProvider, tag: PackItem) => {
    const name = await window.showInputBox({ title: 'Enter a Tag Name', placeHolder: 'My New Tag' });
    if (!name || name === undefined) { return; };
    const dir = join(tag.dir, UtilFunctions.revertGrammaredName(name)+".json");

    if (!existsSync(tag.dir)) { mkdirSync(tag.dir, { recursive: true }); };

    await writeFileSync(dir, JSON.stringify({
        values:[]
    },undefined,2));
    commands.executeCommand('vscode.open', Uri.file(dir));
    provider.refresh();
};