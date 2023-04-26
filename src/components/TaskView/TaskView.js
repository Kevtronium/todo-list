const taskViewStyles = ["bg-green-500", "col-start-2", "cols-span-1"];

function createTaskView() {
  const taskView = document.createElement("div");
  taskView.classList.add(...taskViewStyles);

  return taskView;
}

export default createTaskView;
