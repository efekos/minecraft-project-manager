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
* Changed view name from `Current Pack: Current Pack ` to `MCM: Current Pack`

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
* Added *Recipes* to namespaces in 'MCM: Current Pack' 
* Added *Structures* to namespaces in 'MCM: Current Pack' 
* Added *Loot Tables* to namespaces in 'MCM: Current Pack' 
* Renamed command `mc.workspace.function.create` to `mc.workspace.createFunction`
* Renamed command `mc.workspace.tag.create` to `mc.workspace.createTag`