import { CurrentPackProvider, PackItem } from '../class/CurrentPackProvider';
import { UtilFunctions } from '../class/UtilFunctions';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { window } from 'vscode';

export default async (provider: CurrentPackProvider, func: PackItem) => {
    const name = await window.showInputBox({ title: 'Enter a Folder Name', placeHolder: 'My New Folder' });
    if (!name || name === undefined) { return; };
    const dir = join(func.dir, UtilFunctions.revertGrammaredName(name));

    await mkdirSync(dir, { recursive: true });
    provider.refresh();
};