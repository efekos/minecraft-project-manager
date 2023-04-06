
import { join } from 'path';
import * as vscode from 'vscode';
import { Datapack, World, WorldsProvider } from './class/WorldsProvider';
import { mkdirSync, rmSync, writeFileSync } from 'fs';

export function activate(context: vscode.ExtensionContext) {

	const provider = new WorldsProvider();
	vscode.window.registerTreeDataProvider('worlds', provider);

	context.subscriptions.push(
		vscode.commands.registerCommand('mc.refresh', () => {
			provider.refresh();
		}),
		vscode.commands.registerCommand('mc.world.create', async (world: World<Datapack>) => {
			const name = await vscode.window.showInputBox({ title: 'Enter Pack Name:', placeHolder: 'main', ignoreFocusOut: false });
			if (!name) { return vscode.window.showErrorMessage("You must give a name"); }
			if (name.toLowerCase() !== name || name.includes(' ')) { return vscode.window.showErrorMessage("Name can't include spaces"); }

			const progress = vscode.window.withProgress({ location: vscode.ProgressLocation.Notification, title: 'Creating a datapack...', cancellable: false }, async (prog, token): Promise<unknown> => {
				const dir = join(world.data.datapacksDirectory, name);
				await mkdirSync(dir,);
				await mkdirSync(`${dir}\\data\\${name}\\functions`, { recursive: true });
				await mkdirSync(`${dir}\\data\\minecraft\\tags\\functions`, { recursive: true });
				await writeFileSync(`${dir}\\pack.mcmeta`, JSON.stringify({
					pack: {
						pack_format: 9,
						description: "pack"
					}
				}, undefined, 2), { encoding: 'utf8' }); // pack.mcmeta
				await writeFileSync(`${dir}\\data\\minecraft\\tags\\functions\\tick.json`, JSON.stringify({ values: [`${name}:tick`] }, undefined, 2), { encoding: 'utf8' });//tick tags
				await writeFileSync(`${dir}\\data\\minecraft\\tags\\functions\\load.json`, JSON.stringify({ values: [`${name}:load`] }, undefined, 2), { encoding: 'utf8' });//load tags
				await writeFileSync(`${dir}\\data\\${name}\\functions\\load.mcfunction`, 'say loadworks', { encoding: 'utf8' });//load tags
				await writeFileSync(`${dir}\\data\\${name}\\functions\\tick.mcfunction`, 'say tickworks', { encoding: 'utf8' });//load tags

				return Promise.resolve();
			});

		}),
		vscode.commands.registerCommand('mc.datapack.delete', async (pack: Datapack) => {
			try {
				await rmSync(pack.data.directory, { recursive: true });
				vscode.window.showInformationMessage(`Successfully deleted ${pack.data.name}!`);
			} catch (error) {
				vscode.window.showErrorMessage(`Couldn't remove the datapack : ${error}`);
			}
			provider.refresh();
		}),
		vscode.commands.registerCommand('mc.open', (dir: string) => {
			vscode.commands.executeCommand('vscode.openFolder', dir);
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
