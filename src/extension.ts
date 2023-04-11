
import * as vscode from 'vscode';
import { Datapack, World, WorldsProvider } from './class/WorldsProvider';
import mcRefresh from './commands/mc.refresh';
import mcWorldCreate from './commands/mc.world.create';
import mcDatapackDelete from './commands/mc.datapack.delete';
import mcOpen from './commands/mc.open';
import { CurrentPackProvider, PackItem } from './class/CurrentPackProvider';
import mcWorkspaceRefresh from './commands/mc.workspace.refresh';
import mcWorkspaceFunctionCreate from './commands/mc.workspace.createTag';
import { join } from 'path';
import mcWorkspaceTagCreate from './commands/mc.workspace.createTag';
import mcWorkspaceCreateFolder from './commands/mc.workspace.createFolder';
import mcWorkspaceDelete from './commands/mc.workspace.delete';
import mcWorkspaceCreateRecipe from './commands/mc.workspace.createRecipe';
import mcWorkspaceCreateLootTable from './commands/mc.workspace.createLootTable';

export function activate(context: vscode.ExtensionContext) {

	// Starting the worlds provider
	const provider = new WorldsProvider();
	vscode.window.registerTreeDataProvider('worlds', provider);

	//Starting the current pack provider
	const rootPath =
		vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
			? vscode.workspace.workspaceFolders[0].uri.fsPath
			: undefined;

	const cprovider = new CurrentPackProvider(rootPath);
	vscode.window.registerTreeDataProvider('workspace', cprovider);

	vscode.workspace.onDidCreateFiles(() => { cprovider.refresh(); });
	vscode.workspace.onDidDeleteFiles(() => { cprovider.refresh(); });
	vscode.workspace.onDidChangeWorkspaceFolders(() => { cprovider.refresh(); });
	vscode.workspace.onDidRenameFiles(() => { cprovider.refresh(); });
	vscode.workspace.onDidSaveTextDocument(e => {
		console.log(e.fileName);
		if (e.fileName === join(rootPath as string, 'mconfig.json')) {
			cprovider.refresh();
		}
	});

	// Registering the commands
	context.subscriptions.push(
		vscode.commands.registerCommand('mc.refresh', () => mcRefresh(provider)),
		vscode.commands.registerCommand('mc.world.create', async (world: World<Datapack>) => mcWorldCreate(provider, world)),
		vscode.commands.registerCommand('mc.datapack.delete', async (pack: Datapack) => mcDatapackDelete(provider, pack)),
		vscode.commands.registerCommand('mc.open', (dir: string) => mcOpen(dir)),
		vscode.commands.registerCommand('mc.workspace.refresh', () => mcWorkspaceRefresh(cprovider)),
		vscode.commands.registerCommand('mc.workspace.createFunction', (root: PackItem) => mcWorkspaceFunctionCreate(cprovider, root)),
		vscode.commands.registerCommand('mc.workspace.createTag', (tag: PackItem) => mcWorkspaceTagCreate(cprovider, tag)),
		vscode.commands.registerCommand('mc.workspace.delete', (tag: PackItem) => mcWorkspaceDelete(cprovider, tag)),
		vscode.commands.registerCommand('mc.workspace.createFolder', (tag: PackItem) => mcWorkspaceCreateFolder(cprovider, tag)),
		vscode.commands.registerCommand('mc.workspace.createRecipe', (tag: PackItem) => mcWorkspaceCreateRecipe(cprovider, tag)),
		vscode.commands.registerCommand('mc.workspace.createLootTable', (tag: PackItem) => mcWorkspaceCreateLootTable(cprovider, tag)),
	);
}

export function deactivate() { }