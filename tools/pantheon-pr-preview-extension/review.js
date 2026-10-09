const { isAllowedUrl } = globalThis.PantheonPr;
const params = new URLSearchParams(location.search);
document.title = params.get("title") || "Review";

for (const entry of params.getAll("pane")) {
  const [label, url] = entry.split("|");
  if (!isAllowedUrl(url)) continue;
  const pane = document.createElement("section");
  pane.className = "pane";
  const header = document.createElement("header");
  const name = document.createElement("strong");
  name.textContent = label;
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Open in tab";
  header.append(name, link);
  const frame = document.createElement("iframe");
  frame.src = url;
  frame.title = label;
  pane.append(header, frame);
  document.querySelector("#panes").append(pane);
}
