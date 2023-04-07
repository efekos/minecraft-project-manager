import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { Command, Event, EventEmitter, ThemeIcon, TreeDataProvider, TreeItem, TreeItemCollapsibleState, TreeItemLabel, Uri } from "vscode";

export type Items<T> = World<T> | T;

export class WorldsProvider implements TreeDataProvider<Items<Datapack>> {
    private _onDidChangeTreeData: EventEmitter<Items<Datapack> | undefined | void> = new EventEmitter<Items<Datapack> | undefined | void>();
    readonly onDidChangeTreeData: Event<Items<Datapack> | undefined | void> = this._onDidChangeTreeData.event;

    constructor() {
    }

    refresh(): void {
        this.getChildren();
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: TreeItem): TreeItem {
        return element;
    }

    getVersionFromFormat(format: number): string {
        if (format === 0) { return "1.14-"; };
        if (format === 2) { return "1.14-"; };
        if (format === 3) { return "1.14-"; };
        if (format === 3) { return "1.14-"; };
        if (format === 4) { return "1.14"; };
        if (format === 5) { return "1.15"; };
        if (format === 6) { return "1.16"; };
        if (format === 7) { return "1.17"; };
        if (format === 8) { return "1.18"; };
        if (format === 9) { return "1.19"; };
        if (format > 9) { return "1.19+"; };
        return "?";
    }

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

        if (element) { return Promise.resolve(element.data.currentItems); };

        const savesDir = join(process.env.APPDATA as string, '.minecraft', 'saves');
        const worlds = await readdirSync(savesDir);

        const items = await worlds.map(r => new World<Datapack>(r, TreeItemCollapsibleState.Collapsed, {
            currentItems: this.getDatapacks(join(savesDir, r, 'datapacks')),
            datapacksDirectory: join(savesDir, r, 'datapacks'),
            directory: join(savesDir, r),
            name: r
        }));

        return Promise.resolve(items);
    }
}

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

    iconPath = {
        dark: join(__filename, '..', '..', 'images', 'mc-world-light.svg'),
        light: join(__filename, '..', '..', 'images', 'mc-world-dark.svg')
    };

    contextValue = 'world';
}