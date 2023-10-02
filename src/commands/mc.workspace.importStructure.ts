import { QuickPickItem, window } from "vscode";
import { CurrentPackProvider, PackItem, PackItemType } from "../class/CurrentPackProvider";
import { join } from "path";
import { copyFile, copyFileSync, existsSync, mkdir, mkdirSync, readdirSync } from "fs";
import { notifications } from "../class/NotificationProvider";
import assert = require("assert");
import { UtilFunctions } from "../class/UtilFunctions";


async function impotyWorld(cprovider: CurrentPackProvider, item: PackItem, rootpath: string) {
    const dir = join(rootpath, '..', '..', 'generated');
    if (!existsSync(dir)) mkdirSync(dir);
    const items = await window.showQuickPick(UtilFunctions.getFiles(dir, "nbt").map(r => { return { label: r.replace("\\structures\\", ":") }; }), { canPickMany: true, title: 'Choose structures to import' });

    if (items?.length === 0) { return; }
    assert(items);
    const errs: NodeJS.ErrnoException[] = [];
    try {
        items.map(item => { item.label = item.label.replace(":", "\\structures\\"); return item; }).forEach(async ite => {
            const actualPath = join(dir, ite.label);
           
            if (!existsSync(item.dir)) { mkdir(item.dir, { recursive: true }, (e) => { }); };

            const copyDir = ite.label.split("\\");
            copyDir.shift(); copyDir.shift(); // removing '<packName>' and 'structures' from the path.


            const copyPath = join(item.dir, copyDir.join("\\"));
            const somethin = copyPath.split("\\");
            somethin.pop();
            if (!existsSync(somethin.join("\\"))) mkdirSync(somethin.join("\\"), { recursive: true });

            await copyFile(actualPath, join(item.dir, copyDir.join("\\")), (e) => {
                if (e) {
                    notifications.sendErrorMessage("An unknown error occoured:" + e.message, "workspace.import.ErrorUnknown");
                }
            });
        });


    } catch (error) {
        notifications.sendErrorMessage(`Couldn't import all structures: ${error}`, 'workspace.import.ErrorUnknown');
    } finally {
        if (errs.length > 0) {
            notifications.sendErrorMessage(`Couldn't import all structures ${errs.join(',')}`, 'workspace.import.ErrorFS');
        } else {
            notifications.sendInformationMessage('Successfully imported all structures!', 'workspace.import.Success');
            cprovider.refresh();
        }
    }

}


export default async (cprovider: CurrentPackProvider, item: PackItem, rootpath?: string) => {
    if (!rootpath) { return; }

    if (item.type === PackItemType.structureRoot || item.type === PackItemType.structureFolder) {
        await impotyWorld(cprovider, item, rootpath);
    }
};