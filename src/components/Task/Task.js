const taskContainerStyles = [
  "task",
  "flex",
  "items-center",
  "justify-between",
  "rounded",
  "p-2",
  "hover:bg-slate-300",
];
const leftSideContainerStyles = ["flex", "items-center", "gap-2"];
const checkboxStyles = [
  "before:content['']",
  "before:delay-{120ms}",
  "before:clip-checkmark",
  "grid",
  "h-6",
  "w-6",
  "appearance-none",
  "place-content-center",
  "rounded-sm",
  "border-2",
  "border-solid",
  "border-black",
  "ease-in-out",
  "before:h-3",
  "before:w-3",
  "before:origin-bottom-left",
  "before:scale-0",
  "before:bg-blue-500",
  "before:transition-transform",
  "checked:before:scale-100",
];

const rightSideContainerStyles = ["flex", "items-center", "gap-6"];
const detailsBtnStyles = [
  "rounded-sm",
  "border-2",
  "border-solid",
  "border-black",
  "p-1",
  "font-bold",
  "hover:bg-slate-400",
  "hover:text-white",
  "active:bg-slate-600",
  "active:text-black",
];
const iconStyles = ["h-6", "w-6", "hover:fill-slate-400", "active:fill-black"];

function createTask(task) {
  const taskContainer = document.createElement("div");

  const leftSideContainer = document.createElement("div");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add(...checkboxStyles);
  leftSideContainer.appendChild(checkbox);

  const text = document.createElement("p");
  text.textContent = task.text;
  leftSideContainer.appendChild(text);
  leftSideContainer.classList.add(...leftSideContainerStyles);
  taskContainer.appendChild(leftSideContainer);

  const rightSideContainer = document.createElement("div");
  const detailsBtn = document.createElement("button");
  detailsBtn.textContent = "Details";
  detailsBtn.classList.add(...detailsBtnStyles);
  rightSideContainer.appendChild(detailsBtn);

  const dueDate = document.createElement("p");
  dueDate.textContent = task.dueDate;
  rightSideContainer.appendChild(dueDate);

  const svgNamespace = "http://www.w3.org/2000/svg";
  const editIcon = document.createElementNS(svgNamespace, "svg");
  const editIconPath = document.createElementNS(svgNamespace, "path");
  editIconPath.setAttribute(
    "d",
    "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
  );
  editIcon.appendChild(editIconPath);
  editIcon.setAttribute("viewBox", "0 0 24 24");
  editIcon.classList.add(...iconStyles);
  rightSideContainer.appendChild(editIcon);

  const deleteIcon = document.createElementNS(svgNamespace, "svg");
  const deleteIconPath = document.createElementNS(svgNamespace, "path");
  deleteIconPath.setAttribute(
    "d",
    "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
  );
  deleteIcon.appendChild(deleteIconPath);
  deleteIcon.setAttribute("viewBox", "0 0 24 24");
  deleteIcon.classList.add(...iconStyles);
  rightSideContainer.appendChild(deleteIcon);

  rightSideContainer.classList.add(...rightSideContainerStyles);
  taskContainer.appendChild(rightSideContainer);
  taskContainer.classList.add(...taskContainerStyles);

  return taskContainer;
}

export default createTask;