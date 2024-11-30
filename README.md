# Meal Categories App

## Overview

This is a React application that featch  the recipe from MealDB  on thr basis of user ingerdient and displays a list of food categories fetched from the MealDB API in category page . The app has features for dynamically loading more categories as the user scrolls, responsive grid layout adjustments based on screen size, and an interactive UI.

## Features

- **Category List**: Displays a list of food categories with images and descriptions.
- **Responsive Design**: The grid layout adjusts based on screen width to provide an optimized user experience for mobile, tablet, and desktop devices.
  - 4 columns for large screens.
  - 2 columns for tablets and small screens.
  - Single column for small mobile screens.
- **Load More**: Button to dynamically load more categories when clicked, increasing the visible count by 8.
- **Interactive UI**: Categories and images are interactive:
  - Hover effects for images and category containers.
  - Click on a category image to navigate to a detailed view page.
- **Error Handling**: Handles errors when fetching data from the API and displays appropriate error messages.
- **Loading State**: Displays a loading spinner while categories are being fetched.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **React Router**: For navigating between pages.
- **JavaScript (ES6+)**: For handling application logic.
- **CSS**: For styling the component, including responsive design.
- **MealDB API**: External API used to fetch categories data.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/393akashsharma/Recipe_Idea_WebApplication.git
