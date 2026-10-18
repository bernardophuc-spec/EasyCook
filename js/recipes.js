const params = new URLSearchParams(window.location.search);

const category = params.get("category");

const recipesContainer = document.getElementById("recipes-container");

const categoryTitle = document.getElementById("category-title");

const categoryDescription = document.getElementById("category-description");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("error-message");

const categoryNames = {
  Breakfast: "Bữa sáng",

  Chicken: "Món gà",

  Pasta: "Món pasta",

  Dessert: "Tráng miệng",
};

if (category) {
  categoryTitle.textContent = categoryNames[category] || category;

  categoryDescription.textContent = `Các công thức thuộc danh mục ${
    categoryNames[category] || category
  }`;
}

async function loadRecipes() {
  if (!category) {
    loading.style.display = "none";

    errorMessage.textContent = "Không tìm thấy danh mục.";

    return;
  }

  try {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Không thể kết nối API");
    }

    const data = await response.json();

    loading.style.display = "none";

    if (!data.meals || data.meals.length === 0) {
      errorMessage.textContent = "Không tìm thấy công thức nào.";

      return;
    }

    displayRecipes(data.meals);
  } catch (error) {
    console.error(error);

    loading.style.display = "none";

    errorMessage.textContent =
      "Có lỗi xảy ra khi tải công thức. Vui lòng thử lại.";
  }
}

function displayRecipes(meals) {
  recipesContainer.innerHTML = "";

  meals.forEach(function (meal) {
    const card = document.createElement("div");

    card.className = "recipe-card";

    card.innerHTML = `

      <div class="recipe-image-wrapper">

        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
          class="recipe-image"
        />

      </div>


      <div class="recipe-content">

        <h3>
          ${meal.strMeal}
        </h3>

        <button
          class="view-recipe"
          data-id="${meal.idMeal}"
        >
          Xem công thức
        </button>

      </div>

    `;

    recipesContainer.appendChild(card);
  });

  const buttons = document.querySelectorAll(".view-recipe");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const mealId = button.dataset.id;

      window.location.href = `recipe-detail.html?id=${mealId}`;
    });
  });
}

loadRecipes();
