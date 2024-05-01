import { existsSync, mkdirSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { Command, Event, EventEmitter, ThemeIcon, TreeDataProvider, TreeItem, TreeItemCollapsibleState, TreeItemLabel, Uri } from "vscode";
import { UtilFunctions } from "./UtilFunctions";

// type to trick data provider that im using one type
export type Items<T> = World<T> | T;

export class WorldsProvider implements TreeDataProvider<Items<Datapack>> {
    private _onDidChangeTreeData: EventEmitter<Items<Datapack> | undefined | void> = new EventEmitter<Items<Datapack> | undefined | void>();
    readonly onDidChangeTreeData: Event<Items<Datapack> | undefined | void> = this._onDidChangeTreeData.event;

    constructor() {
    }

    /**
     * refreshes worlds menu
     */
    refresh(): void {
        this.getChildren();
        this._onDidChangeTreeData.fire();
    }

    //idk what this is why would i want to get a tree item when i already have it
    getTreeItem(element: TreeItem): TreeItem {
        return element;
    }

    /**
     * Gets mc version from a format
     * @param format pack format
     * @returns mc version of what format means, with a - or + if its not between 1.14-24w05a
     * @since 1.0.5
     */
    getVersionFromFormat(format: number): string {
        if (format < 4) { return "1.14-"; };
        switch (format) {
            case 4: return "1.14";
            case 5: return "1.15";
            case 6: return "1.16";
            case 7: return "1.17";
            case 8: return "1.18";
            case 9: return "1.18.2";
            case 10: return "1.19";
            case 11: return "23w04a";
            case 12: return "1.19.4";
            case 13: return "23w13a";
            case 14: return "23w16a";
            case 15: return "1.20";
            case 16: return "23w31a";
            case 17: return "23w16a";
            case 18: return "1.20.2";
            case 19: return "23w40a";
            case 20: return "23w41a";
            case 21: return "23w42a";
            case 22: return "23w43a";
            case 23: return "23w44a";
            case 24: return "23w45a";
            case 25: return "23w46a";
            case 26: return "1.20.4";
            case 27: return "23w51a";
            case 28: return "24w03a";
            case 29: return "24w04a";
            case 30: return "24w05a";
            case 31: return "24w06a";
            case 32: return "24w07a";
            case 33: return "24w09a";
            case 34: return "24w10a";
            case 35: return "24w11a";
            case 36: return "24w12a";
            case 37: return "24w13a";
            case 38: return "24w14a";
            case 39: return "1.20.5-pre1";
            case 40: return "1.20.5-pre2";
            case 41: return "1.20.6";
        }
        if (format > 41) { return "1.20.6+"; };
        return "?";
    }

    /**
     * Gets datapacks of a world as a Datapack class
     * @param directory datapacks directory of a world
     * @returns datapacks found as Datapack
     * @since 0.0.2
     */
    getDatapacks(directory: string): Datapack[] {
        const result: Datapack[] = [];
        if (!existsSync(directory)) { mkdirSync(directory); }
        readdirSync(directory).forEach(packFolder => {
            const mcmetaDir = join(directory, packFolder, 'pack.mcmeta');
            if (!existsSync(mcmetaDir)) { return; }
            const mcmeta = JSON.parse(readFileSync(mcmetaDir).toString('utf8'));
            if (!mcmeta.pack.pack_format || !mcmeta.pack.description) { return; }

            result.push(new Datapack(packFolder, TreeItemCollapsibleState.None, { description: mcmeta.pack.description, name: packFolder, version: this.getVersionFromFormat(mcmeta.pack.pack_format), directory: join(directory, packFolder) },
                {
                    command: 'mc.open',
                    title: '',
                    arguments: [Uri.file(join(directory, packFolder))]
                }
            ));
        });
        return result;
    }

    async getChildren(element?: World<Datapack>): Promise<Items<Datapack>[]> {

        // get its current packs if its a world
        if (element) { return Promise.resolve(element.data.currentItems); };

        //get saves and worlds
        const savesDir = join(process.env.APPDATA as string, '.minecraft', 'saves');
        const worlds = await readdirSync(savesDir);

        //convert every world name to a World<Datapack>
        const items = await worlds.map(r => new World<Datapack>(r, TreeItemCollapsibleState.Collapsed, {
            currentItems: this.getDatapacks(join(savesDir, r, 'datapacks')),
            datapacksDirectory: join(savesDir, r, 'datapacks'),
            directory: join(savesDir, r),
            name: r
        }));

        return Promise.resolve(items);
    }
}

// class definitions
export interface WorldData<T> {
    name: string,
    directory: string,
    datapacksDirectory: string,
    currentItems: T[];
}

export interface DatapackData {
    name: string,
    version: string,
    description: string;
    directory: string;
}

export class Datapack extends TreeItem {
    constructor(
        public readonly label: string | TreeItemLabel,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly data: DatapackData,
        public readonly command?: Command
    ) {
        super(label, collapsibleState);

        this.description = `${data.version}`;
        this.tooltip = `${data.description}`;
    }

    iconPath = ThemeIcon.File;

    contextValue = 'datapack';
}

export class World<T> extends TreeItem {
    constructor(
        public readonly label: string | TreeItemLabel,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly data: WorldData<T>,
        public readonly command?: Command
    ) {
        super(label, collapsibleState);

        this.description = `(${data.currentItems.length})`;
    }

    iconPath = UtilFunctions.getIconPaths('symbol-world');

    contextValue = 'world';
}