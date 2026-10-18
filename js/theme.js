document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("websiteTheme") || "light";
  } catch (error) {}

  function applyTheme(theme) {
    const isDark = theme === "dark";

    body.classList.toggle("dark-theme", isDark);

    const button = document.getElementById("themeToggle");

    if (button) {
      button.textContent = isDark ? "☀️" : "🌙";
      button.setAttribute(
        "aria-label",
        isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối",
      );

      button.title = isDark
        ? "Chuyển sang giao diện sáng"
        : "Chuyển sang giao diện tối";
    }
  }

  const button = document.createElement("button");

  button.id = "themeToggle";
  button.type = "button";
  button.textContent = "🌙";
  document.body.appendChild(button);

  applyTheme(savedTheme);

  button.addEventListener("click", function () {
    const nextTheme = body.classList.contains("dark-theme") ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("websiteTheme", nextTheme);
    } catch (error) {}
  });
});
