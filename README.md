# Food Finder

---

# Project Overview

Food Finder is a web application that helps users explore different food dishes and discover detailed information about them. By simply entering a dish name such as *pizza*, *biryani*, or *burger*, users can view a list of meals along with images, ingredients, instructions, and additional details in an interactive interface.

---

# Objective

The objective of this project is to demonstrate:

* JavaScript fundamentals
* API integration using `fetch()`
* Dynamic UI rendering
* Responsive web design
* Use of Array Higher-Order Functions (HOFs) such as `map` and `sort`
* Local storage usage for saving user preferences

---

# Problem Statement

Users often want to explore new dishes or learn how to prepare a meal but lack a simple platform that provides structured and detailed information in one place. This application simplifies the process by allowing users to search for meals and instantly access complete recipe details in a user-friendly format.

---

# Key Features

## Search Functionality

* Search for any food item (e.g., pizza, burger, biryani)
* Fetch and display meals dynamically from the API

## Detailed Meal View

* Click on any dish to view:

  * Ingredients
  * Cooking instructions
  * Category and origin
  * Embedded video tutorial (if available)

## Sorting (Using HOFs)

* Sort meals alphabetically:

  * A → Z
  * Z → A

## Favorites System

* Mark meals as liked
* Save preferences using local storage

## Responsive Design

* Mobile: Single column layout
* Tablet: Two-column layout
* Desktop: Grid-based layout

## Dark Mode

* Toggle between light and dark themes for better user experience

---

# API Used

* **TheMealDB API**
  Used to fetch meal data, including recipes, images, and additional details.

---

# Technologies Used

* HTML
* CSS
* JavaScript (ES6)
* Fetch API

---

# Concepts Covered

* API integration
* Promises and asynchronous programming
* DOM manipulation
* Array higher-order functions (`map`, `sort`)
* Event handling
* Responsive design using media queries

---

# Project Structure

```
Food-Finder/
│
├── index.html
├──media.css
├── style.css
├── script.js
├── README.md
```

---

# Future Enhancements

* Location of Nearby resturant and rating
* Advanced filtering (category, cuisine)
* Favorites page for saved meals
* Live search without button
* Improved UI/UX design
* Pagination or infinite scrolling
* Deployment on Vercel or Netlify

---

# Final Note

This project focuses on building a practical and user-friendly application while applying core web development concepts. It combines API integration, responsive design, and interactive UI elements to create a complete and functional food exploration platform.
