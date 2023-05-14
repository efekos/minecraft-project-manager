import { existsSync, readFileSync, readdirSync } from "fs";
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
     * @returns mc version of what format means, gets - and + if its not between 1.14-1.19
     * @since 0.0.8_1
     */
    getVersionFromFormat(format: number): string {
        if (format < 4) { return "1.14-"; };
        if (format === 4) { return "1.14"; };
        if (format === 5) { return "1.15"; };
        if (format === 6) { return "1.16"; };
        if (format === 7) { return "1.17"; };
        if (format === 8) { return "1.18"; };
        if (format === 9) { return "1.18.2"; };
        if (format === 10) { return "1.19"; };
        if (format > 10) { return "1.19+"; };
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