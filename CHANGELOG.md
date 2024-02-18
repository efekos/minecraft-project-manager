# Unreleased

## 0.0.1
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-dot.png) Initial first build of MPM.

## 0.0.2

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed functionality of command `mc.world.create`\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed functionality of command `mc.datapack.delete`

## 0.0.3

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added extension icon\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed world icon\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed sidebar icon

## 0.0.4

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed command handling system

## 0.0.5

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added setting `minecraftProjectManager.worlds.defaultPackFormat`\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added setting `minecraftProjectManager.worlds.defaultPackDescription`\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added 'Do not show again' to notifications\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added comments to where users might need to understand the source code 

## 0.0.6

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added view `MCM: Current Pack`: Datapack item tree to see what you have more easily\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.refresh`: Refresh Current Pack\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.function.create`: Create New Function\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.function.delete`: Delete a Function\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added a clone of vscode symbols to `./images/icons`

## 0.0.7

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.tag.create`: Create New Tag in Workspace (Hidden in command palette)\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.delete`: Delete in Workspace (Hidden in command palette)\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.createFolder`: Create folder in workspace (Hidden in command palette)\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added **Tags*category to 'MCM: Current Pack' view\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed how 'MCM: Current Pack' view works: Now you need a file called *mconfig.jsonin your workspace, and define a data folder in `data` property to see something in 'MCM: Current Pack'. see [mconfig.json](./docs/mconfig.md)\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed functionality of `mc.world.create`: Now it also adds a *mconfig.jsonto the workspace\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-deleted.png) Removed command `mc.workspace.function.delete` with reason: Moved to a global command called `mc.workspace.delete`\

## 0.0.8
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.createRecipe`: Create New Recipe in Workspace (Hidden in command palette)\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.createLootTable`: Craete New Loot Table in Workspace (Hidden in command palette)\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added **Recipes*category to 'MCM: Current Pack' \
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added **Structures*category to 'MCM: Current Pack' \
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added **Loot Tables*category to 'MCM: Current Pack' \
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Renamed command `mc.workspace.function.create` to `mc.workspace.createFunction`\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Renamed command `mc.workspace.tag.create` to `mc.workspace.createTag`

## 0.0.8_1
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added 2 icons: symbol-import,symbol-export\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.importStructure`: Import a Structure to Workspace (Hidden in command palette) (Still in progress)\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added JSON Validation to `mconfig.json` files\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed directory of custom icons\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed some of the icons

# 1.0

## 1.0.0

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-dot.png) First public release of MCM ever.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added importing structures from the world's minecraft namespace to any datapack & any folder.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-deleted.png) Removed command `mc.workspace.exportStructure`: unused command for now.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-fix.png) Fixed typo in docs/MConfig: "feature" to "future"\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-fix.png) Fixed being able to open .nbt files via 'MCM: Current Pack'\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-fix.png) Fixed datapack versions not being the real version according to the Minecraft Wiki\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-fix.png) Fixed trying to open a folder in text editor when adding it via 'MCM: Current Pack' 

## 1.0.1

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed pack formats coming from `WorldsProvider#getVersionFromFormat` to match with new pack formats, including Minecraft 1.20.

## 1.0.2

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-fix.png) Fixed an ENOENT error causing when there is no 'datapacks' folder inside a world. ([#1](https://github.com/efekos/minecraft-project-manager/issues/1))

## 1.0.3

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-change.png) Changed functionality of `mc.workspace.importStructure`: Now you can import structures from other namespaces, not just `minecraft`.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-dot.png) Updated pack formats of `WorldsProvider.getVersionFromFormat(string)`.

## 1.0.4

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-dot.png) Updated datapack versions of `WorldsProvider.getVersionFromFormat(string)`.

# 1.1

## 1.1.0

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-dot.png) Updated datapack versions of `WorldProvider.getVersionFromFormat(string)`.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added 'Advancements' tab to 'MCM: Current Pack'.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added command `mc.workspace.createAdvancement`: Creates a template in the 'Advancements' tab of a namespace.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-dot.png) Now 'minecraft' namespace has a special new icon: `symbol-bold-namespace`

## 1.1.1

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added custom icons to recipes.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added custom icons to loot tables.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added custom icons to structures.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added custom icons to tags.\
![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-minus.png) Removed default icons from 'icons' folder.

## 1.1.2

![](https://raw.githubusercontent.com/efekos/efekos/main/icons/symbol-plus.png) Added description to items in 'MCM: Current Pack'\
* Advancement show their name in-game.
* Tags show amount of values inside them.
* Loot tables show the pool number.
