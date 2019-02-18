export const compileTemplate = htmlString => {
  const container = document.createElement("div");
  const nodes = new DOMParser().parseFromString(htmlString, "text/html").body
    .childNodes;
  Array.from(nodes).forEach(node => container.appendChild(node));
  return container;
};
