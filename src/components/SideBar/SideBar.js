const sidebarStyles = ["cols-span-1", "bg-blue-500"];

function createSidebar() {
  const sidebar = document.createElement("div");
  sidebar.classList.add(...sidebarStyles);

  return sidebar;
}

export default createSidebar;
