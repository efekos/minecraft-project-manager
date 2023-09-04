# Unreleased

## 0.0.1
* Initial first build of MPM.

## 0.0.2
* Changed functionality of command `mc.world.create`
* Changed functionality of command `mc.datapack.delete`

## 0.0.3
* Added extension icon
* Changed world icon
* Changed sidebar icon

## 0.0.4
* > Changed command handling system

## 0.0.5
* Added setting `minecraftProjectManager.worlds.defaultPackFormat`
* Added setting `minecraftProjectManager.worlds.defaultPackDescription`
* Added 'Do not show again' to notifications
* > Added comments to where users might need to understand the source code 

## 0.0.6
* Added view `MCM: Current Pack`: Datapack item tree to see what you have more easily
* Added command `mc.workspace.refresh`: Refresh Current Pack
* Added command `mc.workspace.function.create`: Create New Function
* Added command `mc.workspace.function.delete`: Delete a Function
* Added a clone of vscode symbols to `./images/icons`

## 0.0.7
* Added command `mc.workspace.tag.create`: Create New Tag in Workspace (Hidden in command palette)
* Added command `mc.workspace.delete`: Delete in Workspace (Hidden in command palette)
* Added command `mc.workspace.createFolder`: Create folder in workspace (Hidden in command palette)
* Added **Tags** category to 'MCM: Current Pack' view
* Changed how 'MCM: Current Pack' view works: Now you need a file called *mconfig.json* in your workspace, and define a data folder in `data` property to see something in 'MCM: Current Pack'. see [mconfig.json](./docs/mconfig.md)
* Changed functionality of `mc.world.create`: Now it also adds a *mconfig.json* to the workspace
* Removed command `mc.workspace.function.delete` with reason: Moved to a global command called `mc.workspace.delete`

## 0.0.8
* Added command `mc.workspace.createRecipe`: Create New Recipe in Workspace (Hidden in command palette)
* Added command `mc.workspace.createLootTable`: Craete New Loot Table in Workspace (Hidden in command palette)
* Added **Recipes** category to 'MCM: Current Pack' 
* Added **Structures** category to 'MCM: Current Pack' 
* Added **Loot Tables** category to 'MCM: Current Pack' 
* Renamed command `mc.workspace.function.create` to `mc.workspace.createFunction`
* Renamed command `mc.workspace.tag.create` to `mc.workspace.createTag`

## 0.0.8_1
* Added 2 icons: symbol-import,symbol-export
* Added command `mc.workspace.importStructure`: Import a Structure to Workspace (Hidden in command palette) (Still in progress)
* Added JSON Validation to `mconfig.json` files
* Changed directory of custom icons
* Changed some of the icons

# 1.0

## 1.0.0
* First public release of MCM ever.
* Added importing structures from the world's minecraft namespace to any datapack & any folder.
* Removed command `mc.workspace.exportStructure`: unused command for now.
* Fixed typo in docs/MConfig: "feature" to "future"
* Fixed being able to open .nbt files via 'MCM: Current Pack'
* Fixed datapack versions not being the real version according to the Minecraft Wiki
* Fixed trying to open a folder in text editor when adding it via 'MCM: Current Pack' 

## 1.0.1
* Changed pack formats coming from `WorldsProvider#getVersionFromFormat` to match with new pack formats, including Minecraft 1.20.

## 1.0.2
* Fix an ENOENT error causing when there is no 'datapacks' folder inside a world. ([#1](https://github.com/efekos/minecraft-project-manager/issues/1))