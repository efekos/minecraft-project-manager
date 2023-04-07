import { commands } from "vscode";

export default (dir: string) => {
    commands.executeCommand('vscode.openFolder', dir);
};