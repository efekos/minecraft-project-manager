import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { Command, Event, EventEmitter, ThemeColor, ThemeIcon, TreeDataProvider, TreeItem, TreeItemCollapsibleState, TreeItemLabel, Uri, workspace } from "vscode";
import { UtilFunctions } from "./UtilFunctions";
import { notifications } from "./NotificationProvider";


function getChilds(element: PackItem): Thenable<PackItem[]> {

    switch (element.type) {
        case PackItemType.namespace: // *get basic things under a namespace
            return Promise.resolve([
                new PackItem('Functions', TreeItemCollapsibleState.Collapsed, PackItemType.functionRoot, join(element.dir, 'functions')),
                new PackItem('Tags', TreeItemCollapsibleState.Collapsed, PackItemType.tagRoot, join(element.dir, 'tags'))
            ]);
        case PackItemType.functionRoot: // *get the elements under a root or folder
        case PackItemType.functionFolder:
            if (!existsSync(element.dir)) { return Promise.resolve([]); };

            const items = readdirSync(element.dir).map(r => {
                if (UtilFunctions.getExtension(r) === "mcfunction") {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.None, PackItemType.function, join(element.dir, r), {
                        command: 'vscode.open',
                        title: '',
                        arguments: [Uri.file(join(element.dir, r))]
                    });
                } else {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.Collapsed, PackItemType.functionFolder, join(element.dir, r));
                }
            });

            return Promise.resolve(items);
        case PackItemType.tagRoot:
        case PackItemType.tagFolder: // *get the elements under a root or folder
            if (!existsSync(element.dir)) { return Promise.resolve([]); }

            const itemss = readdirSync(element.dir).map(r => {
                if (UtilFunctions.getExtension(r) === "json") {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.None, PackItemType.tag, join(element.dir, r), {
                        command: 'vscode.open',
                        title: '',
                        arguments: [Uri.file(join(element.dir, r))]
                    });
                } else {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.Collapsed, PackItemType.tagFolder, join(element.dir, r));
                }
            });

            return Promise.resolve(itemss);
    }
    return Promise.resolve([]);
}

export class CurrentPackProvider implements TreeDataProvider<PackItem> {
    private _onDidChangeTreeData: EventEmitter<PackItem | undefined | void> = new EventEmitter<PackItem | undefined | void>();
    readonly onDidChangeTreeData: Event<PackItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor(
        public readonly root: string | undefined
    ) {
    }

    /**
     * refreshes worlds menu
     */
    refresh(): void {
        this.getChildren();
        this._onDidChangeTreeData.fire();
    }

    //idk what this is why would i want to get a tree item when i already have it
    getTreeItem(element: PackItem): TreeItem {
        return element;
    }

    async getChildren(element?: PackItem): Promise<PackItem[]> {

        if (!this.root) { return Promise.resolve([]); }; // stop if there is no workspace
        if (!existsSync(join(this.root, 'mconfig.json'))) { return Promise.resolve([]); }// stop if there is no mconfig.json in the workspace
        const mconfig = readFileSync(join(this.root, 'mconfig.json'));
        var mconfigJson: any;
        try {
            mconfigJson = JSON.parse(mconfig.toString()) as MConfig;
        } catch (error) {
            notifications.sendErrorMessage(`Current mconfig is invalid: ${error}`, 'workspace.JsonError');
            return Promise.resolve([]); // stop if parsing mconfig fails
        }
        if (!UtilFunctions.confirmValidMConfig(this.root, mconfigJson)) { return Promise.resolve([]); } // stop if mconfig is invalid


        if (element) {
            return getChilds(element);
        };

        //get namespaces
        const namespaces = readdirSync(join(this.root as string, mconfigJson.data));

        return Promise.resolve(namespaces.map(r => new PackItem(r, TreeItemCollapsibleState.Collapsed, PackItemType.namespace, join(this.root as string, mconfigJson.data, r))));
    }
}

//definition

export enum PackItemType { namespace = 'namespace', functionRoot = 'functionRoot', functionFolder = 'functionFolder', function = 'function', tagRoot = 'tagRoot', tagFolder = 'tagFolder', tag = 'tag' }


function getIconPaths(icon: string) {
    return {
        light: join(__filename, '..', '..', 'images', 'icons', 'light', `${icon}.svg`),
        dark: join(__filename, '..', '..', 'images', 'icons', 'dark', `${icon}.svg`)
    };
}

export interface MConfig {
    data: string;
}

export class PackItem extends TreeItem {
    constructor(
        public readonly label: string | TreeItemLabel,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly type: PackItemType,
        public readonly dir: string,
        public readonly command?: Command
    ) {
        super(label, collapsibleState);

        this.tooltip = dir;
        this.description = type;

        if (type === PackItemType.namespace) { this.iconPath = getIconPaths('symbol-namespace'); }
        if (type === PackItemType.functionRoot) { this.iconPath = getIconPaths('symbol-constant'); }
        if (type === PackItemType.functionFolder) { this.iconPath = ThemeIcon.Folder; }
        if (type === PackItemType.function) { this.iconPath = getIconPaths('symbol-method'); }
        if (type === PackItemType.tag) { this.iconPath = getIconPaths('tag'); }
        if (type === PackItemType.tagFolder) { this.iconPath = ThemeIcon.Folder; }
        if (type === PackItemType.tagRoot) { this.iconPath = getIconPaths('symbol-constant'); }

        this.contextValue = type;
    }
}