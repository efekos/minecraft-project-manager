# MConfig.json
MConfig, aka `mconfig.json` is a config file about MCM in that workspace. Currently it's only purpose is defining a *data* property to make *MCM: Current Pack* view work. But I'm thinking about adding another properties and usages of `mconfig.json` in the future


## Schema

|Property|Description|Type|Default Value
|-|-|-|-|
|data|The [data folder](https://minecraft.fandom.com/wiki/Data_pack#data) of current datapack.|string|"./data" 