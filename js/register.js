const form = document.getElementById("register-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim().toLowerCase();

  const password = document.getElementById("password").value;

  const confirmPassword = document.getElementById("confirm-password").value;

  if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự!");

    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp!");

    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(function (user) {
    return user.email === email;
  });

  if (existingUser) {
    alert("Email này đã được đăng ký!");

    return;
  }

  const newUser = {
    name: name,
    email: email,
    password: password,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");

  location.href = "login.html";
});
