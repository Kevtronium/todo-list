import PubSub from "pubsub-js";

const pageStyles = {
  default: [
    "group",
    "flex",
    "items-center",
    "justify-between",
    "w-full",
    "text-2xl",
    "font-bold",
    "hover:bg-gray-400",
    "active:bg-gray-500",
    "text-left",
  ],
  active: ["active", "bg-gray-500"],
};

const deleteBtnStyles = ["invisible", "group-hover:visible"];

function handleDelete(ev) {
  ev.stopPropagation();
  const { id: pageID } = ev.target.parentNode;
  const topic = "Delete project";
  const isActive = ev.target.parentNode.classList.contains("active");

  if (isActive) {
    const inboxPage = document.querySelector("#inbox");
    const changeTaskViewer = "Change Taskviewer to Inbox";
    inboxPage.classList.add(...pageStyles.active);

    PubSub.publish(changeTaskViewer);
  }

  PubSub.publish(topic, pageID);
}

function handleClick(ev) {
  const lastActiveEle = document.querySelector(".active");
  const topic = "Change Page";
  const { id: pageID } = ev.target;

  lastActiveEle.classList.remove(...pageStyles.active);
  ev.target.classList.add(...pageStyles.active);

  PubSub.publish(topic, pageID);
}

function createPage(page) {
  const pageEle = document.createElement("div");

  pageEle.textContent = page.name;
  pageEle.classList.add(...pageStyles.default);
  pageEle.addEventListener("click", handleClick);

  if (page.isActive) {
    pageEle.classList.add(...pageStyles.active);
  }
  if (page.isDeletable) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add(...deleteBtnStyles);
    deleteBtn.addEventListener("click", handleDelete);
    pageEle.appendChild(deleteBtn);
  }
  pageEle.id = page.id;

  return pageEle;
}

export default createPage;
