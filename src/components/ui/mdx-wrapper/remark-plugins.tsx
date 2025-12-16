import remarkParse from "remark-parse";

import remarkGridTables from "@adobe/remark-gridtables";
import remarkGfm from "remark-gfm";

export const remarkPlugins = [remarkParse, remarkGridTables, remarkGfm];
