
import * as vscode from 'vscode';
import { Datapack, World, WorldsProvider } from './class/WorldsProvider';
import mcRefresh from './commands/mc.refresh';
import mcWorldCreate from './commands/mc.world.create';
import mcDatapackDelete from './commands/mc.datapack.delete';
import mcOpen from './commands/mc.open';

export function activate(context: vscode.ExtensionContext) {

	// Starting the worlds provider
	const provider = new WorldsProvider();
	vscode.window.registerTreeDataProvider('worlds', provider);


	// Registering the commands
	context.subscriptions.push(
		vscode.commands.registerCommand('mc.refresh', () => mcRefresh(provider)),
		vscode.commands.registerCommand('mc.world.create', async (world: World<Datapack>) => mcWorldCreate(provider, world)),
		vscode.commands.registerCommand('mc.datapack.delete', async (pack: Datapack) => mcDatapackDelete(provider, pack)),
		vscode.commands.registerCommand('mc.open', (dir: string) => mcOpen(dir))
	);
}

export function deactivate() { }