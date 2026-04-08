const container = document.querySelector(".container");
const inputBox = document.getElementById("input");
const searchBtn = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const themeBtn = document.getElementById("theme");



let meals = [];



async function fetchMeals(searchText = "salad") {
  container.innerHTML = "<h2>Loading...</h2>";

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    );

    const data = await response.json();
    meals = data.meals ? data.meals : [];

    displayMeals();
  } catch (error) {
    container.innerHTML = "<h2>Something went wrong ❌</h2>";
  }
}


function displayMeals() {

  if (meals.length === 0) {
    container.innerHTML = "<h2>No meals found 😢</h2>";
    return;
  }

  
  let mealsToShow = [...meals];

  
  if (sortSelect.value === "az") {
    mealsToShow.sort((a, b) =>
      a.strMeal.localeCompare(b.strMeal)
    );
  }

  if (sortSelect.value === "za") {
    mealsToShow.sort((a, b) =>
      b.strMeal.localeCompare(a.strMeal)
    );
  }

  
  let html = "";

  mealsToShow.forEach((meal) => {
    html += `
      <div class="card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <button onclick="toggleLike('${meal.idMeal}')">
          ${meal.liked ? "❤️" : "🤍"}
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}


function toggleLike(id) {
  meals = meals.map((meal) => {
    if (meal.idMeal === id) {

      return { ...meal, liked: !meal.liked };
    } else {
      return meal;
    }
  });

  displayMeals();
}



function handleSearch() {
  const text = inputBox.value.trim();

  if (text === "") {
    fetchMeals(); 
  } else {
    fetchMeals(text);
  }
}


searchBtn.addEventListener("click", handleSearch);

inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});


sortSelect.addEventListener("change", displayMeals);


themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});



fetchMeals(); 