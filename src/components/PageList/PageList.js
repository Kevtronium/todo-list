const pageListStyles = ["flex", "flex-col", "gap-2"];

function createPageList(pages) {
  const pageList = document.createElement("div");

  pages.forEach((ele) => {
    pageList.appendChild(ele);
  });
  pageList.classList.add(...pageListStyles);

  return pageList;
}

export default createPageList;
