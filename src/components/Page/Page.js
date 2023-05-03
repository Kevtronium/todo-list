const pageStyles = {
  default: [
    "w-full",
    "text-2xl",
    "font-bold",
    "hover:bg-gray-400",
    "active:bg-gray-500",
    "text-left",
  ],
  active: ["active", "bg-gray-500"],
};

function handleClick(ev) {
  const lastActiveEle = document.querySelector(".active");

  lastActiveEle.classList.remove(...pageStyles.active);
  ev.target.classList.add(...pageStyles.active);
}

function createPage(page) {
  const pageEle = document.createElement("button");

  pageEle.textContent = page.name;
  pageEle.classList.add(...pageStyles.default);
  pageEle.addEventListener("click", handleClick);

  if (page.isActive) {
    pageEle.classList.add(...pageStyles.active);
  }

  return pageEle;
}

export default createPage;
