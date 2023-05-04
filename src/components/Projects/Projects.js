import PubSub from "pubsub-js";
import createAddProject from "./AddProject";
import createPage from "../Page/Page";

const projectsStyles = ["flex", "flex-col", "gap-2", "font-bold"];
const headingStyles = ["text-3xl"];
const projectItemsStyle = ["flex", "flex-col", "gap-2", "font-bold", "pl-4"];
const btnStyles = [
  "hover:bg-gray-400",
  "active:bg-gray-500",
  "text-left",
  "text-lg",
];
const topic = "Add project to DOM";
const topicDelete = "Delete project from DOM";

PubSub.subscribe(topic, (_msg, pageData) => {
  const projectItems = document.querySelector("#project-items");
  projectItems.appendChild(createPage(pageData));
});

PubSub.subscribe(topicDelete, (_msg, pageID) => {
  const projectItems = document.querySelector("#project-items");
  const projectToDelete = document.querySelector(`#${pageID}`);

  projectItems.removeChild(projectToDelete);
});

function createProjects(projectsList) {
  const projects = document.createElement("div");
  const heading = document.createElement("h2");
  const projectItems = document.createElement("div");
  const addBtn = document.createElement("button");
  const addProject = createAddProject();

  heading.textContent = "Projects";
  heading.classList.add(...headingStyles);
  projects.appendChild(heading);

  projectsList.forEach((ele) => {
    projectItems.appendChild(createPage(ele));
  });
  projectItems.classList.add(...projectItemsStyle);
  projectItems.id = "project-items";
  projects.appendChild(projectItems);

  addBtn.textContent = "+ Add Project";
  addBtn.classList.add(...btnStyles);
  projects.appendChild(addBtn);
  projects.appendChild(addProject);

  projects.classList.add(...projectsStyles);

  return projects;
}

export default createProjects;
