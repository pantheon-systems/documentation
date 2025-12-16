declare module "@adobe/remark-gridtables" {
  import { Plugin } from "unified";

  const remarkGridTables: Plugin;
  export default remarkGridTables;
}

declare module "remark-grid-tables" {
  import { Plugin } from "unified";

  const remarkGridTables: Plugin<[], Root>;
  export default remarkGridTables;
}
