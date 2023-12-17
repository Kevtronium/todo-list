const headerStyles = [
  "col-span-2",
  "p-4",
  "border-solid",
  "border-b-slate-300",
  "border-b-2",
];
const textStyles = ["text-4xl", "font-bold"];

function createHeader() {
  const header = document.createElement("header");
  const text = document.createElement("h1");

  text.textContent = "ToDo";
  text.classList.add(...textStyles);
  header.appendChild(text);
  header.classList.add(...headerStyles);
  return header;
}

export default createHeader;
