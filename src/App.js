import PubSub from "pubsub-js";
import { v4 as uuidv4 } from "uuid";
import createHeader from "./components/Header/Header";
import createSidebar from "./components/SideBar/SideBar";
import createTaskView from "./components/TaskView/TaskView";
import createTaskModal from "./components/TaskModal/TaskModal";

const appStyles = [
  "grid",
  "grid-cols-[1fr_3fr]",
  "grid-rows-[0.25fr_3fr]",
  "h-screen",
];

const blurStyle = "blur-sm";

function page(
  name,
  isActive = false,
  isDeletable = false,
  id = `id${uuidv4()}`
) {
  return { name, isActive, isDeletable, id, tasks: [] };
}

function task(title, dueDate, details) {
  return { title, details, isDone: false, dueDate, id: `task${uuidv4()}` };
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
  const taskModal = createTaskModal();
  const addProjectTopic = "Add Project";
  const deleteProjectTopic = "Delete project";
  const changePageTopic = "Change Page";
  const changeToInbox = "Change Taskviewer to Inbox";
  const blurTopic = "Toggle Blur";
  const updateTasksTopic = "Update Task List";
  const deleteTaskTopic = "Delete Task";
  const editTaskTopic = "Edit Task";
  const finishedTaskTopic = "Toggle Task Done State";

  function getPage(pageID) {
    let targetPage = null;

    if (pageID.includes("id")) {
      [targetPage] = projectsList.filter((ele) => ele.id === pageID);
    } else {
      [targetPage] = pages.filter((ele) => ele.id === pageID);
    }

    return targetPage;
  }

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

  PubSub.subscribe(blurTopic, () => {
    header.classList.toggle(blurStyle);
    sidebar.classList.toggle(blurStyle);
    taskView.classList.toggle(blurStyle);
  });

  PubSub.subscribe(updateTasksTopic, (_msg, taskData) => {
    const targetPage = getPage(taskData.listID);
    const addTaskTopic = "Add Task to UI";

    targetPage.tasks.push(
      task(taskData.title, taskData.dueDate, taskData.details)
    );

    PubSub.publish(addTaskTopic, targetPage.tasks[targetPage.tasks.length - 1]);
  });

  PubSub.subscribe(deleteTaskTopic, (_msg, deleteData) => {
    const targetPage = getPage(deleteData.pageID);
    const removeTaskUITopic = "Remove Task from UI";

    targetPage.tasks = targetPage.tasks.filter(
      (ele) => ele.id !== deleteData.taskID
    );
    PubSub.publish(removeTaskUITopic, deleteData.taskID);
  });

  PubSub.subscribe(editTaskTopic, (_msg, taskData) => {
    const targetPage = getPage(taskData.listID);
    const updateTaskUITopic = "Update Task UI";

    const [taskToEdit] = targetPage.tasks.filter(
      (ele) => ele.id === taskData.id
    );
    taskToEdit.title = taskData.title;
    taskToEdit.details = taskData.details;
    taskToEdit.dueDate = taskData.dueDate;

    PubSub.publish(updateTaskUITopic, taskToEdit);
  });

  PubSub.subscribe(finishedTaskTopic, (_msg, taskData) => {
    const targetPage = getPage(taskData.pageID);

    const [targetTask] = targetPage.tasks.filter(
      (ele) => ele.id === taskData.id
    );
    targetTask.isDone = taskData.isDone;
  });

  app.classList.add(...appStyles);
  app.appendChild(taskModal);
  app.appendChild(header);
  app.appendChild(sidebar);
  app.appendChild(taskView);

  return app;
}

export default createApp;
