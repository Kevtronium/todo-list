import PubSub from "pubsub-js";
import createHeader from "./components/Header/Header";
import createSidebar from "./components/SideBar/SideBar";
import createTaskView from "./components/TaskView/TaskView";

const appStyles = [
  "grid",
  "grid-cols-[1fr_3fr]",
  "grid-rows-[0.25fr_3fr]",
  "h-screen",
];

function page(name, isActive = false) {
  return { name, isActive, tasks: [] };
}

function createApp() {
  const app = document.createElement("div");
  const pages = [page("Inbox", true), page("Today"), page("Weekly")];
  const projectsList = [];
  const header = createHeader();
  const sidebar = createSidebar(pages, projectsList);
  const taskView = createTaskView();
  const addProjectTopic = "Add Project";

  PubSub.subscribe(addProjectTopic, (_msg, pageName) => {
    const topic = "Add project to DOM";
    const newPage = page(pageName);
    projectsList.push(newPage);
    PubSub.publish(topic, newPage);
  });

  app.classList.add(...appStyles);
  app.appendChild(header);
  app.appendChild(sidebar);
  app.appendChild(taskView);

  return app;
}

export default createApp;
