import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [ingredient, setIngredient] = useState('');
  const [allMeals, setAllMeals] = useState([]);
  const [visibleMeals, setVisibleMeals] = useState([]);
  const [error, setError] = useState('');
  const itemsToShow = 8;

  // Load state from localStorage when component mounts
  useEffect(() => {
    const savedIngredient = localStorage.getItem('ingredient');
    const savedAllMeals = localStorage.getItem('allMeals');
    const savedVisibleMeals = localStorage.getItem('visibleMeals');

    if (savedIngredient) setIngredient(savedIngredient);
    if (savedAllMeals) setAllMeals(JSON.parse(savedAllMeals));
    if (savedVisibleMeals) setVisibleMeals(JSON.parse(savedVisibleMeals));
  }, []);

  // Function to fetch meals
  const fetchMeals = async () => {
    try {
      setError('');
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      const data = await response.json();
      if (data.meals) {
        setAllMeals(data.meals);
        setVisibleMeals(data.meals.slice(0, itemsToShow));
        // Save to localStorage
        localStorage.setItem('ingredient', ingredient);
        localStorage.setItem('allMeals', JSON.stringify(data.meals));
        localStorage.setItem('visibleMeals', JSON.stringify(data.meals.slice(0, itemsToShow)));
      } else {
        setAllMeals([]);
        setVisibleMeals([]);
        setError('No meals found for the given ingredient.');
      }
    } catch (err) {
      setError(err.message);
      setAllMeals([]);
      setVisibleMeals([]);
    }
  };

  // Function to load more meals
  const loadMoreMeals = () => {
    const newVisibleMeals = allMeals.slice(0, visibleMeals.length + itemsToShow);
    setVisibleMeals(newVisibleMeals);
    localStorage.setItem('visibleMeals', JSON.stringify(newVisibleMeals)); // Update localStorage
  };

  return (
    <div>
      {/* Background Image Section */}
      <div
        style={{
          position: 'relative',
          height: '400px',
          backgroundImage: `url(/img/Home.png)`, // Use the relative path from the `public` folder
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Text Bar, Heading, and Search Button */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '80%',
          }}
        >
          <h1 style={{ marginBottom: '16px', color: 'rgb(10, 10, 98)', fontSize: '50px', fontWeight: '600' }}>
            Enter the ingredient you have
          </h1>
          <input
            type="text"
            placeholder="Enter ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            style={{
              padding: '10px',
              width: '55%',
              borderRadius: '4px',
              border: '1px solid #ddd',
              marginRight: '8px',
              fontSize: '16px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)')}
            onMouseOut={(e) => (e.target.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)')}
          />
          <button
            onClick={fetchMeals}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '4px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 10px rgba(0, 123, 255, 0.4)', // Button shadow
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0056b3';
              e.target.style.borderColor = '#fff';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.borderColor = 'transparent';
              e.target.style.boxShadow = '0 4px 10px rgba(0, 123, 255, 0.4)';
            }}
          >
            Search
          </button>
        </div>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Meals Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '20px' }}>
        {visibleMeals.length > 0 ? (
          visibleMeals.map((meal) => (
            <div
              key={meal.idMeal}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                width: '300px',
                padding: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h3 style={{ marginBottom: '8px' }}>{meal.strMeal}</h3>
              <Link to={`/recipe/${meal.idMeal}`}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '16px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Link>
              <p>Details about the meal can be accessed by clicking the button below.</p>
              <Link
                to={`/recipe/${meal.idMeal}`}
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  backgroundColor: 'rgb(26, 54, 93)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginTop: '10px',
                  transition: 'background-color 0.3s, transform 0.3s',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#0056b3';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#007bff';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                View Recipe
              </Link>
            </div>
          ))
        ) : (
          !error && <p>No meals to display.</p>
        )}
      </div>

      {visibleMeals.length < allMeals.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={loadMoreMeals}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '4px',
              backgroundColor: 'rgb(26, 54, 93)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0, 123, 255, 0.4)', // Button shadow
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
