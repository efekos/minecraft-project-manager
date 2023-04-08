import { rmdir } from "fs";
import { Datapack, WorldsProvider } from "../class/WorldsProvider";
import { window } from "vscode";
import { notifications } from "../class/NotificationProvider";

export default async (provider: WorldsProvider, pack: Datapack) => {
    {
        //Tries deleting the dir
        try {
            await rmdir(pack.data.directory, { recursive: true }, (err) => {
                // Send error if there is an error
                if (err) {
                    notifications.sendErrorMessage(`Couldn't remove the datapack: ${err}`, 'worlds.packDeleteErr');
                } else {
                    // Send noti
                    notifications.sendInformationMessage(`Successfully deleted ${pack.data.name}!`, 'worlds.packDelete');
                    provider.refresh();
                }
            });
        } catch (error) {
            // Send error if it fails
            notifications.sendErrorMessage(`Couldn't remove the datapack: ${error}`, 'worlds.packDeleteErr');
        }
    }
};