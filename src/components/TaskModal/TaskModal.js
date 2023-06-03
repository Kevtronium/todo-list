import PubSub from "pubsub-js";

const modalStyles = [
  "fixed",
  "left-0",
  "top-0",
  "z-10",
  "h-full",
  "w-full",
  "bg-black/60",
];

const contentStyles = [
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

const btnStyles = [
  "rounded-sm",
  "border-2",
  "border-solid",
  "border-black",
  "p-1",
  "hover:bg-gray-600",
  "active:bg-gray-700",
];

const formStyles = ["flex", "flex-col", "gap-3"];
const inputStyles = ["rounded-sm"];
const dueDateContainerStyles = ["space-x-2"];
const dueDateInputStyles = ["rounded-sm", "p-1"];
const btnsContainerStyles = ["flex", "justify-between"];
const hidden = "hidden";
const editStyle = "editing-task";

function createTaskModal() {
  const modal = document.createElement("div");
  const content = document.createElement("div");
  const form = document.createElement("form");
  const toggleTopic = "Toggle Modal";
  const blurTopic = "Toggle Blur";
  const editModalTopic = "Display Edit Modal";
  const editTaskData = {};

  function toggleModal() {
    modal.classList.toggle(hidden);
  }

  function formatDate(date) {
    let formattedDate = date.slice(5);
    formattedDate += `-${date.slice(0, 4)}`;

    return formattedDate;
  }

  function revertFormattedDate(date) {
    let revertedDate = date.slice(6);
    revertedDate += `-${date.slice(0, 5)}`;

    return revertedDate;
  }

  function toggleEditStyle() {
    document.querySelector(`#${editTaskData.id}`).classList.toggle(editStyle);
  }

  PubSub.subscribe(toggleTopic, () => {
    toggleModal();
  });

  PubSub.subscribe(editModalTopic, (_msg, task) => {
    document.querySelector("#modal-task-title").value = task.title;
    document.querySelector("#modal-task-details").value = task.details;
    document.querySelector("#modal-task-due-date").value = revertFormattedDate(
      task.dueDate
    );
    document.querySelector("#modal-submit-btn").textContent = "Save Changes";

    toggleModal();
    editTaskData.id = task.id;
    toggleEditStyle();
    PubSub.publish(blurTopic);
  });

  function handleCloseModal() {
    PubSub.publish(blurTopic);
    toggleModal();
    const submitBtn = document.querySelector("#modal-submit-btn");

    if (submitBtn.textContent === "Save Changes") {
      submitBtn.textContent = "Create Task";
      toggleEditStyle();
    }
  }

  function handleSubmit(ev) {
    const { textContent: btnText } =
      document.querySelector("#modal-submit-btn");
    let topic = "Update Task List";
    ev.preventDefault();

    const task = {};
    const { value: dueDate } = document.querySelector("#modal-task-due-date");
    task.title = document.querySelector("#modal-task-title").value;
    task.details = document.querySelector("#modal-task-details").value;
    if (dueDate === "") {
      task.dueDate = dueDate;
    } else {
      task.dueDate = formatDate(dueDate);
    }
    task.listID = document.querySelector(".active").id;

    if (btnText === "Save Changes") {
      topic = "Edit Task";
      document.querySelector("#modal-submit-btn").textContent = "Create Task";
      task.id = editTaskData.id;
      toggleEditStyle();
    }

    toggleModal();
    ev.target.reset();
    PubSub.publish(blurTopic);
    PubSub.publish(topic, task);
  }

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "modal-task-title";
  titleInput.placeholder = " Title";
  titleInput.required = true;
  titleInput.classList.add(...inputStyles);
  form.appendChild(titleInput);

  const detailsInput = document.createElement("textarea");
  detailsInput.id = "modal-task-details";
  detailsInput.cols = 30;
  detailsInput.rows = 10;
  detailsInput.placeholder = " Details";
  detailsInput.classList.add(...inputStyles);
  form.appendChild(detailsInput);

  const dueDateContainer = document.createElement("fieldset");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.for = "modal-task-due-date";
  dueDateLabel.textContent = "Due Date:";
  dueDateContainer.appendChild(dueDateLabel);

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.id = "modal-task-due-date";
  dueDateInput.classList.add(...dueDateInputStyles);
  dueDateContainer.appendChild(dueDateInput);

  dueDateContainer.classList.add(...dueDateContainerStyles);
  form.appendChild(dueDateContainer);

  const btnsContainer = document.createElement("div");
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Create Task";
  submitBtn.id = "modal-submit-btn";
  submitBtn.classList.add(...btnStyles);
  btnsContainer.appendChild(submitBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "reset";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", handleCloseModal);
  cancelBtn.id = "modal-cancel-btn";
  cancelBtn.classList.add(...btnStyles);
  btnsContainer.appendChild(cancelBtn);

  btnsContainer.classList.add(...btnsContainerStyles);
  form.appendChild(btnsContainer);

  form.classList.add(...formStyles);
  form.addEventListener("submit", handleSubmit);
  content.appendChild(form);
  content.classList.add(...contentStyles);
  modal.appendChild(content);

  modal.classList.add(...modalStyles);
  modal.classList.toggle(hidden);
  modal.id = "modal";

  return modal;
}

export default createTaskModal;
