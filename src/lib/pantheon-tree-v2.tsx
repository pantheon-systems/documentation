interface Node {
  tag: keyof HTMLElementTagNameMap;
  data: string | null;
  attrs: { [key: string]: string };
  children: Node[] | null;
}
export interface PantheonV2Tree {
  version: string;
  children: Node[];
}

export function extractTextFromNode(node: Node): string {
  if (node.data) return node.data;

  if (node.children && node.children.length > 0) {
    return node.children.map(extractTextFromNode).join("");
  }

  return "";
}

export function extractSubtitle(content: string | null): string | null {
  if (!content) return null;

  const findSubtitle = (node: Node): string | null => {
    if (node.tag === "h2" && node.attrs["data-pcc-is-subtitle"] === "true") {
      const subtitle = node.children?.reduce((text, child) => {
        if (child.tag === "span") {
          return text + extractTextFromNode(child);
        }
        return text;
      }, "");

      if (subtitle) {
        return subtitle;
      }
    }

    if (node.children) {
      for (const child of node.children) {
        const foundSubtitle = findSubtitle(child);
        if (foundSubtitle) {
          return foundSubtitle;
        }
      }
    }

    return null;
  };

  const parsedTree = JSON.parse(content) as PantheonV2Tree;
  for (const child of parsedTree.children) {
    const subtitle = findSubtitle(child);
    if (subtitle) {
      return subtitle;
    }
  }

  return null;
}
