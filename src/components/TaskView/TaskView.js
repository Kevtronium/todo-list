import PubSub from "pubsub-js";
import createTask from "../Task/Task";

const taskViewStyles = ["col-start-2", "cols-span-1", "p-6"];
const headingStyles = ["font-bold", "text-3xl"];
const iconStyles = ["h-6", "w-6"];
const btnTextStyles = ["pt-1"];
const btnStyles = [
  "flex",
  "w-full",
  "items-center",
  "justify-center",
  "gap-1",
  "rounded-sm",
  "px-2",
  "py-2",
  "hover:bg-slate-400",
  "active:bg-slate-500",
];

function handleDisplayModal() {
  const blurTopic = "Toggle Blur";
  const modalTopic = "Toggle Modal";

  PubSub.publish(blurTopic);
  PubSub.publish(modalTopic);
}

function createTaskView(page) {
  const taskView = document.createElement("main");
  const heading = document.createElement("h2");
  const tasksContainer = document.createElement("div");
  const addTaskBtn = document.createElement("button");
  const addTaskTopic = "Add Task to UI";
  const updateTopic = "Update Taskviewer";

  PubSub.subscribe(updateTopic, (_msg, pageData) => {
    heading.textContent = pageData.name;
    const taskEles = [];
    pageData.tasks.forEach((ele) => {
      taskEles.push(createTask(ele));
    });
    tasksContainer.replaceChildren(...taskEles);
  });

  PubSub.subscribe(addTaskTopic, (_msg, task) => {
    tasksContainer.appendChild(createTask(task));
  });

  heading.textContent = page.name;
  heading.classList.add(...headingStyles);
  heading.id = "taskview-name";
  taskView.appendChild(heading);

  page.tasks.forEach((ele) => {
    tasksContainer.appendChild(createTask(ele));
  });
  taskView.appendChild(tasksContainer);

  const svgNamespace = "http://www.w3.org/2000/svg";
  const addIcon = document.createElementNS(svgNamespace, "svg");
  const addIconPath = document.createElementNS(svgNamespace, "path");
  addIconPath.setAttribute("d", "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z");
  addIcon.appendChild(addIconPath);
  addIcon.setAttribute("viewbox", "0 0 24 24");
  addIcon.classList.add(...iconStyles);
  addTaskBtn.appendChild(addIcon);

  const btnText = document.createElement("span");
  btnText.textContent = "Add Task";
  btnText.classList.add(...btnTextStyles);
  addTaskBtn.appendChild(btnText);
  addTaskBtn.classList.add(...btnStyles);
  addTaskBtn.addEventListener("click", handleDisplayModal);
  taskView.appendChild(addTaskBtn);

  taskView.classList.add(...taskViewStyles);

  return taskView;
}

export default createTaskView;
