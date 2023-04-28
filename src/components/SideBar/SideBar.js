import createPage from "../Page/Page";

const sidebarStyles = [
  "flex",
  "flex-col",
  "cols-span-1",
  "bg-blue-500",
  "p-6",
  "gap-2",
];

function createSidebar(pages) {
  const sidebar = document.createElement("div");
  const pagesEles = pages.map((page) => createPage(page));
  sidebar.classList.add(...sidebarStyles);

  pagesEles.forEach((ele) => {
    sidebar.appendChild(ele);
  });

  return sidebar;
}

export default createSidebar;
