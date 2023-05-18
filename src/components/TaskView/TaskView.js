import PubSub from "pubsub-js";

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

const topic = "Update Taskviewer";

PubSub.subscribe(topic, (_msg, page) => {
  document.querySelector("#taskview-name").textContent = page.name;
});

function createTaskView(page) {
  const taskView = document.createElement("main");
  const heading = document.createElement("h2");
  const tasksContainer = document.createElement("div");
  const addTaskBtn = document.createElement("button");

  heading.textContent = page.name;
  heading.classList.add(...headingStyles);
  heading.id = "taskview-name";
  taskView.appendChild(heading);
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
  taskView.appendChild(addTaskBtn);

  taskView.classList.add(...taskViewStyles);

  return taskView;
}

export default createTaskView;
