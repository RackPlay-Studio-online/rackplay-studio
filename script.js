const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const surpriseButton = document.getElementById("surpriseButton");
const todoWindow = document.getElementById("todoWindow");
const clickCount = document.getElementById("clickCount");
const smiley = document.getElementById("smiley");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

let clicks = 0;
surpriseButton.addEventListener("click", () => {
  clicks += Math.floor(Math.random() * 9) + 1;
  clickCount.textContent = clicks.toLocaleString("en-US");
  todoWindow.classList.toggle("window-pop");
  todoWindow.style.transform = todoWindow.classList.contains("window-pop")
    ? "rotate(2deg) translateY(-8px)"
    : "rotate(-2deg)";
  surpriseButton.textContent = todoWindow.classList.contains("window-pop") ? "NICE!" : "TRY IT";
});

smiley.addEventListener("click", () => {
  smiley.classList.remove("bounce");
  void smiley.offsetWidth;
  smiley.classList.add("bounce");
});

document.querySelectorAll(".checklist input").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const checkedCount = document.querySelectorAll(".checklist input:checked").length;
    clickCount.textContent = (848720 + checkedCount * 137).toLocaleString("en-US");
  });
});
