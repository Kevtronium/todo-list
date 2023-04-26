import createHeader from "./components/Header/Header";
import createSidebar from "./components/SideBar/SideBar";
import createTaskView from "./components/TaskView/TaskView";

const appStyles = [
  "grid",
  "grid-cols-[1fr_3fr]",
  "grid-rows-[0.25fr_3fr]",
  "h-screen",
];

function createApp() {
  const app = document.createElement("div");
  const header = createHeader();
  const sidebar = createSidebar();
  const taskView = createTaskView();

  app.classList.add(...appStyles);
  app.appendChild(header);
  app.appendChild(sidebar);
  app.appendChild(taskView);

  return app;
}

export default createApp;
