import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { Command, Event, EventEmitter, ThemeColor, ThemeIcon, TreeDataProvider, TreeItem, TreeItemCollapsibleState, TreeItemLabel, Uri, workspace } from 'vscode';
import { UtilFunctions } from './UtilFunctions';
import { notifications } from './NotificationProvider';
import * as vscode from 'vscode';

function getChilds(element: PackItem): Thenable<PackItem[]> {

    switch (element.type) {
        case PackItemType.namespace: // *get basic things under a namespace
            return Promise.resolve([
                new PackItem('Functions', TreeItemCollapsibleState.Collapsed, PackItemType.functionRoot, join(element.dir, 'functions')),
                new PackItem('Tags', TreeItemCollapsibleState.Collapsed, PackItemType.tagRoot, join(element.dir, 'tags')),
                new PackItem('Structures', TreeItemCollapsibleState.Collapsed, PackItemType.structureRoot, join(element.dir, 'structures')),
                new PackItem('Recipes', TreeItemCollapsibleState.Collapsed, PackItemType.recipeRoot, join(element.dir, 'recipes')),
                new PackItem('Loot Tables', TreeItemCollapsibleState.Collapsed, PackItemType.lootTableRoot, join(element.dir, 'loot_tables')),
                new PackItem('Advancements', TreeItemCollapsibleState.Collapsed, PackItemType.advancementRoot, join(element.dir, 'advancements'))
            ]);
        case PackItemType.functionRoot: // *get the elements under a root or folder
        case PackItemType.functionFolder:
            if (!existsSync(element.dir)) { return Promise.resolve([]); };

            const items = readdirSync(element.dir).map(r => {
                if (UtilFunctions.getExtension(r) === 'mcfunction') {
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
                if (UtilFunctions.getExtension(r) === 'json') {
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
        case PackItemType.structureRoot:
        case PackItemType.structureFolder: // *get the elements under a root or folder
            if (!existsSync(element.dir)) { return Promise.resolve([]); }

            const itens = readdirSync(element.dir).map(r => {
                if (UtilFunctions.getExtension(r) === 'nbt') {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.None, PackItemType.structure, join(element.dir, r));
                } else {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.Collapsed, PackItemType.structureFolder, join(element.dir, r));
                }
            });

            return Promise.resolve(itens);
        case PackItemType.recipeRoot:
        case PackItemType.recipeFolder: // *get the elements under a root or folder
            if (!existsSync(element.dir)) { return Promise.resolve([]); }

            const itenss = readdirSync(element.dir).map(r => {
                if (UtilFunctions.getExtension(r) === 'json') {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.None, PackItemType.recipe, join(element.dir, r), {
                        command: 'vscode.open',
                        title: '',
                        arguments: [Uri.file(join(element.dir, r))]
                    });
                } else {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.Collapsed, PackItemType.recipeFolder, join(element.dir, r));
                }
            });

            return Promise.resolve(itenss);
        case PackItemType.lootTableRoot:
        case PackItemType.lootTableFolder: // *get the elements under a root or folder
            if (!existsSync(element.dir)) { return Promise.resolve([]); }

            const itemms = readdirSync(element.dir).map(r => {
                if (UtilFunctions.getExtension(r) === 'json') {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.None, PackItemType.lootTable, join(element.dir, r), {
                        command: 'vscode.open',
                        title: '',
                        arguments: [Uri.file(join(element.dir, r))]
                    });
                } else {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.Collapsed, PackItemType.lootTableFolder, join(element.dir, r));
                }
            });

            return Promise.resolve(itemms);
        case PackItemType.advancementRoot:
        case PackItemType.advancementFolder:
            if (!existsSync(element.dir)) { return Promise.resolve([]); }

            const itemmss = readdirSync(element.dir).map(r => {
                if (UtilFunctions.getExtension(r) === 'json') {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.None, PackItemType.advancement, join(element.dir, r), {
                        command: 'vscode.open',
                        title: '',
                        arguments: [Uri.file(join(element.dir, r))]
                    });
                } else {
                    return new PackItem(UtilFunctions.makeNameGrammar(r), TreeItemCollapsibleState.Collapsed, PackItemType.advancementFolder, join(element.dir, r));
                }
            });

            return Promise.resolve(itemmss);
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

//definitions

export enum PackItemType {
    namespace = 'namespace', functionRoot = 'functionRoot', functionFolder = 'functionFolder', function = 'function',
    tagRoot = 'tagRoot', tagFolder = 'tagFolder', tag = 'tag', structureRoot = 'structureRoot', structure = 'structure', structureFolder = 'structureFolder',
    recipeRoot = 'recipeRoot', recipeFolder = 'recipeFolder', recipe = 'recipe', lootTableRoot = 'lootTableRoot', lootTableFolder = 'lootTableFolder', lootTable = 'lootTable',
    advancementRoot = 'advancementRoot', advancementFolder = 'advancementFolder', advancement = 'advancement'
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

        if (type === PackItemType.namespace) { this.iconPath = UtilFunctions.getIconPaths(`symbol-${label === 'minecraft' ? 'bold-' : ''}namespace`); }
        if (type === PackItemType.functionRoot) { this.iconPath = new ThemeIcon('symbol-constant'); }
        if (type === PackItemType.functionFolder) { this.iconPath = ThemeIcon.Folder; }
        if (type === PackItemType.function) { this.iconPath = new ThemeIcon('symbol-method'); }
        if (type === PackItemType.tag) { this.iconPath = UtilFunctions.getIconPaths('symbol-tag'); }
        if (type === PackItemType.tagFolder) { this.iconPath = ThemeIcon.Folder; }
        if (type === PackItemType.tagRoot) { this.iconPath = UtilFunctions.getIconPaths('symbol-tag-root'); }
        if (type === PackItemType.structureRoot) { this.iconPath = new ThemeIcon("symbol-constant"); }
        if (type === PackItemType.structureFolder) { this.iconPath = ThemeIcon.Folder; }
        if (type === PackItemType.structure) { this.iconPath = new ThemeIcon("symbol-field"); }
        if (type === PackItemType.recipeRoot) { this.iconPath = new ThemeIcon("symbol-constant"); }
        if (type === PackItemType.recipeFolder) { this.iconPath = ThemeIcon.Folder; }
        if (type === PackItemType.recipe) {

            
            try {
                const file = readFileSync(dir);
                const json = JSON.parse(file.toString());
                const k = json['type'];
    
                if (k === 'crafting_shaped') { this.iconPath = UtilFunctions.getIconPaths('symbol-recipe'); }
                else if (k === 'crafting_shapeless') { this.iconPath = UtilFunctions.getIconPaths('symbol-recipe-shapeless'); }
                else if (k === 'blasting' || k === 'smoking' || k === 'smelting') { this.iconPath = UtilFunctions.getIconPaths('symbol-recipe-furnace'); }
                else if (k === 'campfire_cooking') { this.iconPath = UtilFunctions.getIconPaths('symbol-recipe-campfire'); }
                else if (k === 'smithing') { this.iconPath = UtilFunctions.getIconPaths('symbol-recipe-smithing'); }
                else { this.iconPath = UtilFunctions.getIconPaths('symbol-recipe'); }
            } catch(e){
                this.iconPath = UtilFunctions.getIconPaths('symbol-recipe');
            }
            
        }
        if (type === PackItemType.lootTableRoot) { this.iconPath = new ThemeIcon("symbol-constant"); }
        if (type === PackItemType.lootTableFolder) { this.iconPath = ThemeIcon.Folder; }
        if (type === PackItemType.lootTable) { this.iconPath = new ThemeIcon("symbol-structure"); }
        if (type === PackItemType.advancementRoot) { this.iconPath = new ThemeIcon("symbol-constant"); }
        if (type === PackItemType.advancementFolder) { this.iconPath = ThemeIcon.Folder; }
        if (type === PackItemType.advancement) { this.iconPath = UtilFunctions.getIconPaths('symbol-advancement'); }

        this.contextValue = type;
    }
}