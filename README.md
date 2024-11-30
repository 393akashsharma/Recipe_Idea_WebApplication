# Meal Categories App

## Overview

This is a **React application** that fetches recipes from the MealDB API based on user-input ingredients. The app displays a list of food categories in the **Categories Page** and includes features like dynamic loading, responsive design, and an interactive user interface.

## Features

- **Search Recipes by Ingredient**: Users can input ingredients to fetch and view related recipes.
- **Category List**: Displays food categories with images and descriptions sourced from the MealDB API.
- **Responsive Design**:
  - Supports different layouts for various screen sizes:
    - **4 columns** for large screens.
    - **2 columns** for tablets and small screens.
    - **1 column** for small mobile screens.
- **Dynamic Loading**: 
  - Includes a "Load More" button that dynamically loads additional recipes or categories (8 items per click).
- **Interactive UI**:
  - Hover effects on images and category containers.
  - Clicking on a category image navigates to a detailed view page showing recipe details.
- **Error Handling**: Displays user-friendly error messages in case of API failures.
- **Loading State**: Shows a loading spinner while fetching data from the API.

## Technologies Used

- **React**: Core library for building the application.
- **React Router**: For seamless navigation between pages.
- **JavaScript (ES6+)**: To manage application logic.
- **CSS**: Implements responsive and interactive styling.
- **MealDB API**: Provides data for recipes and categories.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/393akashsharma/Recipe_Idea_WebApplication.git
   ```
2. Navigate to the project folder:
   ```bash
   cd Recipe_Idea_WebApplication
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm start
   ```

## How It Works

1. **Search Functionality**: Users input an ingredient to fetch recipes related to it.
2. **Category Browsing**: Navigate through various food categories and load more options dynamically.
3. **Detailed Recipe View**: Click on a recipe to view its full details, including title, category, ingredients, and step-by-step instructions.
4. **Responsive Design**: Works seamlessly on both mobile and desktop devices.

## Screenshots (Optional)

<img src="https://github.com/user-attachments/assets/747bb1df-8313-4975-b9c0-87199f7607b3" alt="Screenshot 1" height="300" width="400">
<img src="https://github.com/user-attachments/assets/0ed5ac06-3f97-4492-9801-182436375042" alt="Screenshot 2" height="300" width="400">
<img src="https://github.com/user-attachments/assets/add1db96-a657-43ee-a3a3-f8b9321286c2" alt="Screenshot 3" height="300" width="400">







## Contribution

Feel free to fork this repository, create a feature branch, and submit a pull request. Contributions are welcome!
