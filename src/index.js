import "./main.css";

const msg = document.createElement("p");

msg.textContent = "Hello World";
msg.classList.add("text-gray-500");

const root = document.querySelector("#root");
root.appendChild(msg);
