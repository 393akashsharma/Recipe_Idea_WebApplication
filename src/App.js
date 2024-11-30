import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';  // Import styled-components
import Navbar from './Component/Navbar'; // Import the Navbar component
import Home from './Component/Page/Home';     // Import the Home component
import About from './Component/Page/About';   // Import the About component
import Category from './Component/Page/Catogery'; // Import the Category component
import RecipeDetails from './Component/Page/RecipeDetails';
import CategoryDetails from './Component/Page/CategoryDetails';

// Global style for fonts and base styling
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
  
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle /> {/* Apply global styles */}

      <Router>
        {/* Navbar will show on every page */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/about" element={<About />} /> {/* About page */}
          <Route path="/category" element={<Category />} /> {/* Category page */}
          <Route path="/recipe/:id" element={<RecipeDetails />} /> {/* Recipe Details page */}
          <Route path="/category/:id" element={<CategoryDetails />} /> {/* Category Details page */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
