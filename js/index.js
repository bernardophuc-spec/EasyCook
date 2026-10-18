const currentUserData = localStorage.getItem("currentUser");

if (!currentUserData) {
  window.location.href = "login.html";
}

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", function () {
  const confirmLogout = confirm("Bạn có muốn đăng xuất không?");

  if (!confirmLogout) {
    return;
  }

  localStorage.removeItem("currentUser");

  window.location.href = "login.html";
});
const categoryButtons = document.querySelectorAll(".category-card");

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const category = button.dataset.category;

    window.location.href = `recipes.html?category=${encodeURIComponent(category)}`;
  });
});
