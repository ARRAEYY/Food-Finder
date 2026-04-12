// Get elements
const container = document.querySelector(".container");
const input = document.getElementById("input");
const searchBtn = document.getElementById("search");
const sort = document.getElementById("sort");
const themeBtn = document.getElementById("theme");

const modal = document.getElementById("mealModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

// Store meals
let meals = [];

// Load meals
async function fetchMeals(text = "salad") {
  container.innerHTML = "<h2>Loading...</h2>";

  try {
    const res = await fetch(
      `https://themealdb.com/api/json/v1/1/search.php?s=${text}`
    );

    const data = await res.json();
    meals = data.meals || [];

    loadLikes();
    showMeals();

  } catch {
    container.innerHTML = "<h2>Network error ❌</h2>";
  }
}

// Show meals
function showMeals() {
  if (meals.length === 0) {
    container.innerHTML = "<h2>No meals found 😢</h2>";
    return;
  }

  let list = [...meals];

  // Sorting
  if (sort.value === "az") {
    list.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (sort.value === "za") {
    list.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }

  // Create cards
  container.innerHTML = list.map(meal => `
    <div class="card" onclick="openDetails('${meal.idMeal}')">
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <button onclick="event.stopPropagation(); likeMeal('${meal.idMeal}')">
        ${meal.liked ? "❤️" : "🤍"}
      </button>
    </div>
  `).join("");
}

// Like system
function likeMeal(id) {
  let liked = JSON.parse(localStorage.getItem("liked")) || [];

  if (liked.includes(id)) {
    liked = liked.filter(x => x !== id);
  } else {
    liked.push(id);
  }

  localStorage.setItem("liked", JSON.stringify(liked));
  loadLikes();
  showMeals();
}

// Load liked data
function loadLikes() {
  let liked = JSON.parse(localStorage.getItem("liked")) || [];

  meals = meals.map(meal => ({
    ...meal,
    liked: liked.includes(meal.idMeal)
  }));
}

// Search
function handleSearch() {
  const text = input.value.trim();
  fetchMeals(text || "salad");
}

searchBtn.onclick = handleSearch;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

// Sort
sort.onchange = showMeals;

// Theme
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
};

// Show details
async function openDetails(id) {
  try {
    const res = await fetch(
      `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await res.json();
    const meal = data.meals[0];

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        ingredients += `<li>${meal["strIngredient" + i]}</li>`;
      }
    }

    modalBody.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}">
      <p><b>Category:</b> ${meal.strCategory}</p>
      <p><b>Area:</b> ${meal.strArea}</p>

      <h3>Ingredients</h3>
      <ul>${ingredients}</ul>

      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
    `;

    modal.classList.remove("hidden");

  } catch {
    alert("Error loading details");
  }
}

// Close modal
closeModal.onclick = () => modal.classList.add("hidden");

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
};

// Start app
fetchMeals();