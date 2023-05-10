import PubSub from "pubsub-js";

const taskViewStyles = ["bg-green-500", "col-start-2", "cols-span-1", "p-6"];
const headingStyles = ["font-bold", "text-3xl"];

const topic = "Update Taskviewer";

PubSub.subscribe(topic, (_msg, page) => {
  document.querySelector("#taskview-name").textContent = page.name;
});

function createTaskView(page) {
  const taskView = document.createElement("main");
  const heading = document.createElement("h2");

  heading.textContent = page.name;
  heading.classList.add(...headingStyles);
  heading.id = "taskview-name";
  taskView.appendChild(heading);

  taskView.classList.add(...taskViewStyles);

  return taskView;
}

export default createTaskView;
