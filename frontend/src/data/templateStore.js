import defaults from "./emailTemplates.json";

const KEY = "emailTemplates";

export function loadTemplates() {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : defaults;
}

export function saveTemplates(templates) {
  localStorage.setItem(KEY, JSON.stringify(templates));
}

export function resetTemplates() {
  localStorage.removeItem(KEY);
}
