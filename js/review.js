document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reviewForm");

  if (!form) return;

  const ratingInput = document.getElementById("rating");
  const starButtons = document.querySelectorAll("#starPicker button");

  const recipeId =
    new URLSearchParams(window.location.search).get("id") ||
    window.location.pathname;

  const storageKey = "recipeReviews_" + recipeId;

  let reviews = [];

  try {
    reviews = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (!Array.isArray(reviews)) reviews = [];
  } catch (error) {
    reviews = [];
  }

  function updateStars(rating) {
    starButtons.forEach(function (button) {
      const value = Number(button.dataset.rating);
      button.style.opacity = value <= rating ? "1" : "0.3";
    });
  }

  starButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      ratingInput.value = button.dataset.rating;
      updateStars(Number(ratingInput.value));
    });
  });

  function renderReviews() {
    const list = document.getElementById("reviewList");
    const average = document.getElementById("averageRating");
    const averageStars = document.getElementById("averageStars");
    const count = document.getElementById("ratingCount");

    list.replaceChildren();

    const total = reviews.reduce(function (sum, review) {
      return sum + review.rating;
    }, 0);

    const avg = reviews.length ? total / reviews.length : 0;

    average.textContent = avg.toFixed(1);
    averageStars.textContent =
      "★".repeat(Math.round(avg)) + "☆".repeat(5 - Math.round(avg));

    count.textContent = reviews.length + " đánh giá";

    if (reviews.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "Chưa có đánh giá nào. Hãy là người đầu tiên!";
      list.appendChild(empty);
      return;
    }

    reviews
      .slice()
      .reverse()
      .forEach(function (review) {
        const item = document.createElement("article");
        item.className = "review-item";

        const name = document.createElement("strong");
        name.textContent = review.name;

        const stars = document.createElement("div");
        stars.className = "rating-stars";
        stars.textContent =
          "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

        const comment = document.createElement("p");
        comment.textContent = review.comment;

        const date = document.createElement("small");
        date.className = "review-date";
        date.textContent = review.date;

        item.append(name, stars, comment, date);
        list.appendChild(item);
      });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("reviewName").value.trim();

    const comment = document.getElementById("reviewComment").value.trim();

    const rating = Number(ratingInput.value);
    const message = document.getElementById("reviewMessage");

    if (!name || !comment || rating < 1 || rating > 5) {
      message.textContent = "Vui lòng nhập đủ thông tin.";
      return;
    }

    const review = {
      name: name,
      comment: comment,
      rating: rating,
      date: new Date().toLocaleDateString("vi-VN"),
    };

    reviews.push(review);

    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch (error) {
      reviews.pop();
      message.textContent = "Không thể lưu đánh giá trên trình duyệt này.";
      return;
    }

    form.reset();
    ratingInput.value = "5";
    updateStars(5);

    message.textContent = "Đánh giá của bạn đã được lưu!";
    renderReviews();
  });

  updateStars(5);
  renderReviews();
});
