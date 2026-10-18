const params = new URLSearchParams(window.location.search);

const mealId = params.get("id");

const detailContainer = document.getElementById("recipe-detail");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("error-message");

async function loadMeal() {
  if (!mealId) {
    loading.style.display = "none";

    errorMessage.textContent = "Không tìm thấy công thức.";

    return;
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    );

    if (!response.ok) {
      throw new Error("Không thể kết nối API");
    }

    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      throw new Error("Không tìm thấy món ăn");
    }

    const meal = data.meals[0];

    displayMeal(meal);
  } catch (error) {
    console.error(error);

    errorMessage.textContent = "Không thể tải công thức.";
  } finally {
    loading.style.display = "none";
  }
}

function getIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];

    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),

        measure: measure ? measure.trim() : "",
      });
    }
  }

  return ingredients;
}

function isFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return favorites.some(function (meal) {
    return meal.idMeal === id;
  });
}

function toggleFavorite(meal) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const existingIndex = favorites.findIndex(function (item) {
    return item.idMeal === meal.idMeal;
  });

  if (existingIndex !== -1) {
    favorites.splice(existingIndex, 1);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    return false;
  }

  const favoriteMeal = {
    idMeal: meal.idMeal,

    strMeal: meal.strMeal,

    strMealThumb: meal.strMealThumb,

    strCategory: meal.strCategory,

    strArea: meal.strArea,
  };

  favorites.push(favoriteMeal);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  return true;
}

function displayMeal(meal) {
  document.title = `${meal.strMeal} - Easy Cook`;

  const ingredients = getIngredients(meal);

  const favorite = isFavorite(meal.idMeal);

  detailContainer.innerHTML = `

    <a
      href="javascript:history.back()"
      class="back-button"
    >
      ← Quay lại
    </a>


    <div class="recipe-container">

      <div class="recipe-image">

        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
        />

      </div>


      <div class="recipe-info">

        <p class="recipe-label">
          ${meal.strCategory || "Recipe"}
        </p>


        <h1>
          ${meal.strMeal}
        </h1>


        <p class="area">
          ${meal.strArea || "Không xác định"}
        </p>


        <button
          id="favorite-btn"
          class="favorite-btn ${favorite ? "favorite-active" : ""}"
        >
          ${favorite ? "Đã yêu thích" : "Thêm vào yêu thích"}
        </button>


        <h2>
          Nguyên liệu
        </h2>


        <ul class="ingredients">

          ${ingredients
            .map(function (item) {
              return `
                <li>

                  <span>
                    ${item.ingredient}
                  </span>

                  <span>
                    ${item.measure}
                  </span>

                </li>
              `;
            })
            .join("")}

        </ul>

      </div>

    </div>


    <section class="instructions">

      <h2>
        Cách chế biến
      </h2>

      <p>
        ${meal.strInstructions || "Chưa có hướng dẫn."}
      </p>

    </section>


    ${
      meal.strYoutube
        ? `
          <a
            href="${meal.strYoutube}"
            target="_blank"
            class="youtube-button"
          >
            ▶ Xem video hướng dẫn
          </a>
        `
        : ""
    }

  `;

  const favoriteBtn = document.getElementById("favorite-btn");

  favoriteBtn.addEventListener("click", function () {
    const added = toggleFavorite(meal);

    if (added) {
      favoriteBtn.textContent = "Đã yêu thích";

      favoriteBtn.classList.add("favorite-active");
    } else {
      favoriteBtn.textContent = "Thêm vào yêu thích";

      favoriteBtn.classList.remove("favorite-active");
    }
  });
}

loadMeal();
