import createPage from "../Page/Page";
import createPageList from "../PageList/PageList";
import createProjects from "../Projects/Projects";

const sidebarStyles = [
  "flex",
  "flex-col",
  "cols-span-1",
  "p-6",
  "gap-4",
  "border-r-slate-300",
  "border-r-2",
];

function createSidebar(pages, projectsList) {
  const sidebar = document.createElement("div");
  const pagesEles = pages.map((page) => createPage(page));
  const pageList = createPageList(pagesEles);
  const projectsEle = createProjects(projectsList);

  sidebar.classList.add(...sidebarStyles);

  sidebar.appendChild(pageList);
  sidebar.appendChild(projectsEle);

  return sidebar;
}

export default createSidebar;
