const API = "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken";

const container = document.querySelector(".container");

async function getData() {
    let response = await fetch(API);
    let data = await response.json();

    displayData(data.meals);
}

function displayData(meals) {
    meals.forEach(meal => {
        let div = document.createElement("div");

        div.innerHTML = `
            <img src="${meal.strMealThumb}" width="200">
            <h3>${meal.strMeal}</h3>
        `;

        container.appendChild(div);
    });
}

getData();