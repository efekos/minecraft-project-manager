import { CurrentPackProvider, PackItem } from "../class/CurrentPackProvider";
import { rmSync } from "fs";

export default async (provider: CurrentPackProvider, func: PackItem) => {
    await rmSync(func.dir);
    provider.refresh();
};