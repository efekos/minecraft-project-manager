import { CurrentPackProvider, PackItem } from "../class/CurrentPackProvider";
import { rmSync } from "fs";

export default async (provider: CurrentPackProvider, tag: PackItem) => {
    await rmSync(tag.dir, { recursive: true });
    provider.refresh();
};