if (localStorage.getItem("currentUser")) {
  location.href = "index.html";
}

const form = document.getElementById("login-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();

  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    alert("Chưa có tài khoản nào. Vui lòng đăng ký!");
    return;
  }

  const existingUser = users.find(function (user) {
    return user.email === email && user.password === password;
  });

  if (existingUser) {
    localStorage.setItem("currentUser", JSON.stringify(existingUser));

    alert("Đăng nhập thành công!");

    location.href = "index.html";
  } else {
    alert("Email hoặc mật khẩu không đúng!");
  }
});
