import { QuickPickItem, window } from "vscode";
import { CurrentPackProvider, PackItem, PackItemType } from "../class/CurrentPackProvider";
import { join } from "path";
import { copyFile, copyFileSync, existsSync, mkdir, mkdirSync, readdirSync } from "fs";
import { notifications } from "../class/NotificationProvider";
import assert = require("assert");
import { UtilFunctions } from "../class/UtilFunctions";


async function impotyWorld(cprovider: CurrentPackProvider, item: PackItem, rootpath: string) {
    const dir = join(rootpath, '..', '..', 'generated', 'minecraft', 'structures');
    const items = await window.showQuickPick(UtilFunctions.getFiles(dir, "nbt").map(r => { return { label: r }; }), { canPickMany: true, title: 'Choose structures to import' });

    if (items?.length === 0) { return; }
    assert(items);
    const errs: NodeJS.ErrnoException[] = [];
    try {
        items.forEach(async ite => {
            const sdkfng = join(dir, ite.label);
            const targetDir = join(item.dir,ite.label);

            if (!existsSync(item.dir)) { mkdir(item.dir, { recursive: true }, (e) => { }); };

            
            const asdfk = targetDir.split("\\");
            asdfk.pop();
            if(!existsSync(asdfk.join("\\"))) {mkdirSync(asdfk.join("\\"),{recursive:true});}

            await copyFile(sdkfng, join(item.dir, ite.label), (e) => {
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