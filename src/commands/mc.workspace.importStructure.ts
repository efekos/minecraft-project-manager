import { QuickPickItem, window } from "vscode";
import { CurrentPackProvider, PackItem, PackItemType } from "../class/CurrentPackProvider";
import { join } from "path";
import { copyFile, copyFileSync, readdirSync } from "fs";
import { notifications } from "../class/NotificationProvider";
import assert = require("assert");


async function impotyWorld(cprovider: CurrentPackProvider, item: PackItem) {
    const dir = join(item.dir, '..', '..', '..', '..', '..', 'generated', 'minecraft', 'structures');
    console.log(dir);
    const items = await window.showQuickPick(readdirSync(dir).map(r => { return { label: r }; }), { canPickMany: true, title: 'Choose structures to import' });
    if (items?.length === 0) { return notifications.sendErrorMessage('You must choose at least one structure', 'workspace.import.ErrorRequired'); }
    assert(items);
    const errs:NodeJS.ErrnoException[] = [];
    try {
        items.forEach(async ite => {
            await copyFile(join(dir, ite.label), item.dir, (err) => {
                if (err) { errs.push(err); };
            });
        });
    } catch (error) {
        notifications.sendErrorMessage(`Couldn't import all structures: ${error}`, 'workspace.import.ErrorUnknown');
    } finally {
        if (errs.length > 0) {
            notifications.sendErrorMessage(`Couldn't import all structures ${errs.join(',')}`, 'workspace.import.ErrorFS');
        } else {
            notifications.sendInformationMessage('Successfully imported all structures!', 'workspace.import.Success');
        }
    }

}


export default async (cprovider: CurrentPackProvider, item: PackItem) => {
    if (item.type === PackItemType.structureRoot) {
        const from = await window.showQuickPick(["Import from World", "Import from Saved"].map(r => { return { label: r } as QuickPickItem; }), { canPickMany: false, title: 'Choose a directory to import' });
        if (!from) { return; }

        if (from.label === "Import from World") {
            await impotyWorld(cprovider, item);
        }
    }
};