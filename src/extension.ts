
import { join } from 'path';
import * as vscode from 'vscode';
import { Datapack, World, WorldsProvider } from './class/WorldsProvider';
import { mkdir, mkdirSync, rmSync, rmdir, writeFile } from 'fs';

export function activate(context: vscode.ExtensionContext) {

	const provider = new WorldsProvider();
	vscode.window.registerTreeDataProvider('worlds', provider);

	context.subscriptions.push(
		vscode.commands.registerCommand('mc.refresh', () => {
			provider.refresh();
		}),
		vscode.commands.registerCommand('mc.world.create', async (world: World<Datapack>) => {
			const name = await vscode.window.showInputBox({ title: 'Enter Pack Name:', placeHolder: 'main', ignoreFocusOut: false });
			if (!name) { return vscode.window.showErrorMessage("You must give a name."); }
			if (name.toLowerCase() !== name || name.includes(' ')) { return vscode.window.showErrorMessage("Name can't include spaces."); }

			const dir = join(world.data.datapacksDirectory, name);
			const errs = [];
			function onErr(error: NodeJS.ErrnoException | null) {
				if (error) { vscode.window.showErrorMessage(`Couldn't create the datapack : ${error}`); };
			}

			await mkdirSync(dir); //ana dir
			await mkdirSync(`${dir}\\data\\${name}\\functions`, { recursive: true }); // dirler1
			await mkdirSync(`${dir}\\data\\minecraft\\tags\\functions`, { recursive: true }); //dirler2
			await writeFile(`${dir}\\pack.mcmeta`, JSON.stringify({ //pack.mcmeta
				pack: {
					pack_format: 9,
					description: "pack"
				}
			}, undefined, 2), onErr); // pack.mcmeta
			await writeFile(`${dir}\\data\\minecraft\\tags\\functions\\tick.json`, JSON.stringify({ values: [`${name}:tick`] }, undefined, 2), onErr);//tick tags
			await writeFile(`${dir}\\data\\minecraft\\tags\\functions\\load.json`, JSON.stringify({ values: [`${name}:load`] }, undefined, 2), onErr);//load tags
			await writeFile(`${dir}\\data\\${name}\\functions\\load.mcfunction`, 'say loadworks', onErr);//load tags
			await writeFile(`${dir}\\data\\${name}\\functions\\tick.mcfunction`, 'say tickworks', onErr);//load tags

			provider.refresh();
		}),
		vscode.commands.registerCommand('mc.datapack.delete', async (pack: Datapack) => {
			try {
				await rmdir(pack.data.directory, { recursive: true }, (err) => {
					if (err) {
						vscode.window.showErrorMessage(`Couldn't remove the datapack: ${err}`);
					} else {
						vscode.window.showInformationMessage(`Successfully deleted ${pack.data.name}!`);
						provider.refresh();
					}
				});
			} catch (error) {
				vscode.window.showErrorMessage(`Couldn't remove the datapack : ${error}`);
			}
		}),
		vscode.commands.registerCommand('mc.open', (dir: string) => {
			vscode.commands.executeCommand('vscode.openFolder', dir);
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
