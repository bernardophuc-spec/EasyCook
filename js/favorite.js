const favoriteContainer = document.getElementById("favorite-container");

const emptyFavorite = document.getElementById("empty-favorite");

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function displayFavorites() {
  const favorites = getFavorites();

  favoriteContainer.innerHTML = "";

  if (favorites.length === 0) {
    emptyFavorite.style.display = "block";

    return;
  }

  emptyFavorite.style.display = "none";

  favorites.forEach(function (meal) {
    const card = document.createElement("article");

    card.className = "favorite-card";

    card.innerHTML = `

        <div class="favorite-image">

          <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
          />

          <button
            class="remove-favorite"
            data-id="${meal.idMeal}"
            title="Xóa khỏi yêu thích"
          >
            ❤️
          </button>

        </div>


        <div class="favorite-content">

          <p class="favorite-category">
            ${meal.strCategory || "Recipe"}
          </p>

          <h3>
            ${meal.strMeal}
          </h3>

          <p class="favorite-area">
            ${meal.strArea || ""}
          </p>


          <div class="favorite-actions">

            <button
              class="view-button"
              data-id="${meal.idMeal}"
            >
              Xem công thức
            </button>

            <button
              class="delete-button"
              data-id="${meal.idMeal}"
            >
              Xóa
            </button>

          </div>

        </div>

      `;

    favoriteContainer.appendChild(card);
  });

  addFavoriteEvents();
}

function addFavoriteEvents() {
  const viewButtons = document.querySelectorAll(".view-button");

  viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = button.dataset.id;

      window.location.href = `recipe-detail.html?id=${id}`;
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = button.dataset.id;

      removeFavorite(id);
    });
  });

  const removeButtons = document.querySelectorAll(".remove-favorite");

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = button.dataset.id;

      removeFavorite(id);
    });
  });
}

function removeFavorite(id) {
  let favorites = getFavorites();

  favorites = favorites.filter(function (meal) {
    return meal.idMeal !== id;
  });

  localStorage.setItem("favorites", JSON.stringify(favorites));

  displayFavorites();
}

displayFavorites();
