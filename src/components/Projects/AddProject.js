import PubSub from "pubsub-js";

const addProjectStyles = ["flex", "flex-col", "gap-3", "invisible"];
const textInputStyles = ["w-full", "p-3", "rounded-md"];
const btnStyles = {
  default: ["w-1/3", "p-2", "rounded-lg"],
  addStyles: ["bg-green-400", "hover:bg-green-300", "active:bg-green-500"],
  cancelStyles: ["bg-red-400", "hover:bg-red-300", "active:bg-red-500"],
};
const btnsContainerStyles = ["flex", "justify-between"];

function handleSubmit(ev) {
  ev.preventDefault();
  const textInput = document.querySelector("#add-project-name");
  const { value } = textInput;
  const addProjectTopic = "Add Project";

  textInput.value = "";
  PubSub.publish(addProjectTopic, value);
}

function handleCancel() {
  document.querySelector("#display-add-form-btn").classList.toggle("hidden");
  document.querySelector("#add-project-form").classList.toggle("invisible");
}

function createAddProject() {
  const addProject = document.createElement("form");
  const textInput = document.createElement("input");
  const btnsContainer = document.createElement("div");
  const addBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");

  textInput.type = "text";
  textInput.value = "";
  textInput.required = true;
  textInput.classList.add(...textInputStyles);
  textInput.id = "add-project-name";
  addProject.appendChild(textInput);

  addBtn.textContent = "Add";
  addBtn.classList.add(...btnStyles.default.concat(btnStyles.addStyles));
  addBtn.type = "submit";
  btnsContainer.appendChild(addBtn);

  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add(...btnStyles.default.concat(btnStyles.cancelStyles));
  cancelBtn.type = "reset";
  cancelBtn.addEventListener("click", handleCancel);
  btnsContainer.classList.add(...btnsContainerStyles);
  btnsContainer.appendChild(cancelBtn);

  addProject.appendChild(btnsContainer);
  addProject.classList.add(...addProjectStyles);
  addProject.addEventListener("submit", handleSubmit);

  addProject.id = "add-project-form";

  return addProject;
}

export default createAddProject;
