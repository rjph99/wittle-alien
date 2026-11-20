import "./style.css";
import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject();

const nav = document.querySelector("#site-nav");
const toggle = document.querySelector(".menu-toggle");
const form = document.querySelector("#crew-form");
const formPanel = document.querySelector("#crew-form-panel");
const thanks = document.querySelector("#crew-thanks");
const email = document.querySelector("#email");
const error = document.querySelector("#email-error");
const dialog = document.querySelector("#sneak-dialog");
const year = document.querySelector("#year");

if (year) year.textContent = String(new Date().getFullYear());

function closeMenu() {
  if (!nav || !toggle) return;
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.querySelector("#sneak-open")?.addEventListener("click", () => {
  dialog?.showModal();
});

document.querySelector("#sneak-close")?.addEventListener("click", () => {
  dialog?.close();
});

document.querySelector("#sneak-join")?.addEventListener("click", () => {
  dialog?.close();
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = email.value.trim();
  const valid = value.length > 0 && email.checkValidity();
  if (!valid) {
    error.hidden = false;
    email.setAttribute("aria-invalid", "true");
    email.focus();
    return;
  }
  error.hidden = true;
  email.removeAttribute("aria-invalid");
  formPanel.hidden = true;
  thanks.hidden = false;
  const heading = document.querySelector("#thanks-title");
  heading?.focus();
});

email?.addEventListener("input", () => {
  if (!error.hidden && email.checkValidity()) {
    error.hidden = true;
    email.removeAttribute("aria-invalid");
  }
});
