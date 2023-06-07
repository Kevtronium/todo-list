import { v4 as uuidv4 } from "uuid";

/*
 Code is from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
*/

function storageAvailable(type) {
  let storage;

  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      ((e instanceof DOMException && e.code === 22) ||
        e.code === 1014 ||
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      storage &&
      storage.length !== 0
    );
  }
}

function page(
  name,
  isActive = false,
  isDeletable = false,
  id = `id${uuidv4()}`
) {
  return { name, isActive, isDeletable, id, tasks: [] };
}

function task(title, dueDate, details) {
  return { title, details, isDone: false, dueDate, id: `task${uuidv4()}` };
}

function StorageSystem() {
  function getPagesAndProjects() {
    const pages = {};

    if (localStorage.length !== 0) {
      if (localStorage.getItem("pages")) {
        pages.pages = JSON.parse(localStorage.getItem("pages"));
      }
      if (localStorage.getItem("projects")) {
        pages.projects = JSON.parse(localStorage.getItem("projects"));
      }
    }
    return pages;
  }

  function loadPages() {
    let pages = [
      page("Inbox", true, false, "inbox"),
      page("Today", false, false, "today"),
      page("Weekly", false, false, "weekly"),
    ];

    if (storageAvailable) {
      const loadedPages = getPagesAndProjects();

      if (loadedPages !== {} && loadedPages.pages) {
        pages = loadedPages.pages;
      }
    }

    return pages;
  }

  function loadProjects() {
    let projects = [];

    if (storageAvailable) {
      const loadedPages = getPagesAndProjects();

      if (loadedPages !== {} && loadedPages.projects) {
        projects = loadedPages.projects;
      }
    }

    return projects;
  }

  function updatePages(newPages) {
    localStorage.setItem("pages", JSON.stringify(newPages));
  }

  function updateProjects(newProjects) {
    localStorage.setItem("projects", JSON.stringify(newProjects));
  }

  return { loadPages, loadProjects, updatePages, updateProjects };
}

function initializeStorage() {
  const pages = [
    page("Inbox", true, false, "inbox"),
    page("Today", false, false, "today"),
    page("Weekly", false, false, "weekly"),
  ];

  const projects = [];

  pages[0].tasks = [
    task("Buy some Milk", "", "Go to the store and buy some milk"),
    task("Wash the Car", "", ""),
  ];

  localStorage.setItem("pages", JSON.stringify(pages));
  localStorage.setItem("projects", JSON.stringify(projects));
}

if (!localStorage.getItem("pages")) {
  initializeStorage();
}

const storageSystem = StorageSystem();

export default storageSystem;
