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

let clicks = 2;
surpriseButton.addEventListener("click", () => {
  clicks += Math.floor(Math.random() * 9) + 1;
  clickCount.textContent = clicks.toLocaleString("en-US");
  todoWindow.classList.toggle("window-pop");
  todoWindow.style.transform = todoWindow.classList.contains("window-pop")
    ? "rotate(2deg) translateY(-8px)"
    : "rotate(-2deg)";
  surpriseButton.textContent = todoWindow.classList.contains("window-pop") ? "NICE!" : "TRY IT";
});
 
document.querySelectorAll(".checklist input").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const checkedCount = document.querySelectorAll(".checklist input:checked").length;
    clickCount.textContent = (848720 + checkedCount * 137).toLocaleString("en-US");
  });
});

/* ==============================
   DEMO REQUEST FORM
================================ */

const demoForm = document.getElementById("demoRequestForm");
const demoStatus = document.getElementById("demoFormStatus");
const submitButton = document.getElementById("demoSubmitBtn");

if (demoForm && demoStatus && submitButton) {
  demoForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!demoForm.reportValidity()) {
      return;
    }

    const accessKey = demoForm.querySelector("[name='access_key']");

    if (!accessKey || !accessKey.value.trim() || accessKey.value === "YOUR_WEB3FORMS_ACCESS_KEY") {
      demoStatus.textContent = "Please configure your Web3Forms access key before submitting.";
      demoStatus.className = "error";
      return;
    }

    const originalButtonText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.textContent = "SENDING...";
    demoStatus.textContent = "";
    demoStatus.className = "";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(demoForm)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Form submission failed.");
      }

      demoStatus.textContent = "Thank you! Your request has been sent successfully. We will get back to you soon.";
      demoStatus.className = "success";
      demoForm.reset();
    } catch (error) {
      console.error("Demo form submission failed:", error);

      demoStatus.textContent = "Sorry, we couldn't send your request. Please try again.";
      demoStatus.className = "error";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
}