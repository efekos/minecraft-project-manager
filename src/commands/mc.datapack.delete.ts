import { rmdir } from "fs";
import { Datapack, WorldsProvider } from "../class/WorldsProvider";
import { window } from "vscode";

export default async (provider:WorldsProvider,pack:Datapack)=>{
    {
        try {
            await rmdir(pack.data.directory, { recursive: true }, (err) => {
                if (err) {
                    window.showErrorMessage(`Couldn't remove the datapack: ${err}`);
                } else {
                    window.showInformationMessage(`Successfully deleted ${pack.data.name}!`);
                    provider.refresh();
                }
            });
        } catch (error) {
            window.showErrorMessage(`Couldn't remove the datapack : ${error}`);
        }
    }
}