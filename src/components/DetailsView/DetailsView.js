import PubSub from "pubsub-js";

const bkgdContainerStyles = [
  "fixed",
  "left-0",
  "top-0",
  "z-10",
  "h-full",
  "w-full",
  "bg-black/60",
];

const contentStyles = [
  "flex",
  "flex-col",
  "gap-1",
  "absolute",
  "left-1/3",
  "top-1/4",
  "w-1/2",
  "rounded-sm",
  "border-2",
  "border-solid",
  "border-black",
  "bg-gray-500",
  "p-4",
];

const headingStyles = ["text-2xl", "font-bold"];
const labelStyles = ["font-bold"];

const btnStyles = [
  "rounded-sm",
  "border-2",
  "border-solid",
  "border-black",
  "p-1",
  "hover:bg-gray-600",
  "active:bg-gray-700",
];

const hidden = "hidden";

function createInfoElement(labelText, text) {
  const infoEle = document.createElement("p");
  const label = document.createElement("span");
  const textEle = document.createElement("span");

  label.textContent = `${labelText}: `;
  label.classList.add(...labelStyles);
  textEle.textContent = text;

  infoEle.appendChild(label);
  infoEle.appendChild(textEle);

  return infoEle;
}

function changeInfoText(infoEle, newText) {
  const textEle = infoEle.querySelectorAll("span")[1];
  textEle.textContent = newText;
}

function createDetailsView(task) {
  const bkgdContainer = document.createElement("div");
  const content = document.createElement("div");

  const taskTitle = document.createElement("h2");
  taskTitle.textContent = task.title;
  taskTitle.classList.add(...headingStyles);
  content.appendChild(taskTitle);

  const container = document.createElement("div");
  const project = createInfoElement("Project", task.page);
  container.appendChild(project);

  const dueDateText = task.dueDate !== "" ? task.dueDate : "No Due Date";
  const dueDate = createInfoElement("Due Date", dueDateText);
  container.appendChild(dueDate);

  const details = createInfoElement("Details", task.details);
  container.appendChild(details);
  content.appendChild(container);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.classList.add(...btnStyles);
  content.appendChild(closeBtn);

  content.classList.add(...contentStyles);
  bkgdContainer.appendChild(content);

  bkgdContainer.classList.add(...bkgdContainerStyles);

  function toggleHidden() {
    bkgdContainer.classList.toggle(hidden);
  }

  function handleCloseClick() {
    const blurTopic = "Toggle Blur";

    toggleHidden();
    PubSub.publish(blurTopic);
  }

  closeBtn.addEventListener("click", handleCloseClick);

  const toggleDetailsTopic = "Toggle Details View";

  PubSub.subscribe(toggleDetailsTopic, (_msg, taskData) => {
    taskTitle.textContent = taskData.title;
    changeInfoText(project, taskData.page);
    changeInfoText(dueDate, taskData.dueDate);
    changeInfoText(details, taskData.details);
    toggleHidden();
  });

  toggleHidden();

  return bkgdContainer;
}

export default createDetailsView;
