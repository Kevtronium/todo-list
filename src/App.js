import PubSub from "pubsub-js";
import { v4 as uuidv4 } from "uuid";
import createHeader from "./components/Header/Header";
import createSidebar from "./components/SideBar/SideBar";
import createTaskView from "./components/TaskView/TaskView";

const appStyles = [
  "grid",
  "grid-cols-[1fr_3fr]",
  "grid-rows-[0.25fr_3fr]",
  "h-screen",
];

function page(
  name,
  isActive = false,
  isDeletable = false,
  id = `id${uuidv4()}`
) {
  return { name, isActive, isDeletable, id, tasks: [] };
}

function createApp() {
  const app = document.createElement("div");
  const pages = [
    page("Inbox", true, false, "inbox"),
    page("Today", false, false, "today"),
    page("Weekly", false, false, "weekly"),
  ];
  let projectsList = [];
  const header = createHeader();
  const sidebar = createSidebar(pages, projectsList);
  const taskView = createTaskView(pages[0]);
  const addProjectTopic = "Add Project";
  const deleteProjectTopic = "Delete project";
  const changePageTopic = "Change Page";
  const changeToInbox = "Change Taskviewer to Inbox";

  PubSub.subscribe(addProjectTopic, (_msg, pageName) => {
    const topic = "Add project to DOM";
    const newPage = page(pageName, false, true);
    projectsList.push(newPage);
    PubSub.publish(topic, newPage);
  });

  PubSub.subscribe(deleteProjectTopic, (_msg, pageID) => {
    const topic = "Delete project from DOM";
    projectsList = projectsList.filter((ele) => ele.id !== pageID);

    PubSub.publish(topic, pageID);
  });

  PubSub.subscribe(changePageTopic, (_msg, pageID) => {
    const topic = "Update Taskviewer";
    let targetPage = null;

    if (pageID.includes("id")) {
      [targetPage] = projectsList.filter((ele) => ele.id === pageID);
    } else {
      [targetPage] = pages.filter((ele) => ele.id === pageID);
    }

    PubSub.publish(topic, targetPage);
  });

  PubSub.subscribe(changeToInbox, () => {
    const taskViewerName = document.querySelector("#taskview-name");
    taskViewerName.textContent = pages[0].name;
  });

  app.classList.add(...appStyles);
  app.appendChild(header);
  app.appendChild(sidebar);
  app.appendChild(taskView);

  return app;
}

export default createApp;
