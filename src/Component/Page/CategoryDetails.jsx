import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); 

  useEffect(() => {
  
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
        );
        if (!response.ok) throw new Error('Failed to fetch meals');
        const data = await response.json();
        setMeals(data.meals || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMeals();

   
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [id]);

  
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  
  const handleImageClick = (mealId) => {
    navigate(`/recipe/${mealId}`);

  };

  if (loading) return <div style={styles.loaderContainer}><div className="spinner"></div></div>;
  if (error) return <div>Error: {error}</div>;


  let gridTemplateColumns = 'repeat(4, 1fr)'; 
  if (screenWidth <= 768) {
    gridTemplateColumns = 'repeat(2, 1fr)'; 
  }
  if (screenWidth <= 480) {
    gridTemplateColumns = '1fr'; 
  }

  return (
    <div>
      <h1 style={styles.categoryHeader}>Meals in {id} Category</h1>
      <div style={{ ...styles.gridContainer, gridTemplateColumns }}>
        {meals.slice(0, visibleCount).map((meal) => (
          <div
            key={meal.idMeal}
            style={styles.card}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            <h3 style={styles.cardHeader}>{meal.strMeal}</h3>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={styles.cardImage}
              onClick={() => handleImageClick(meal.idMeal)}
            />
            <p style={styles.cardDescription}>
              Click the image for more details of {meal.strMeal}
            </p>
          </div>
        ))}
      </div>
      
      {visibleCount < meals.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={handleLoadMore} style={styles.loadMoreButton}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: 'rgb(26, 54, 93)',
  },
  categoryHeader: {
    textAlign: 'center',
    fontSize: '2.5rem',
    color: 'rgb(26, 54, 93)',
    marginBottom: '20px',
  },
  gridContainer: {
    display: 'grid',
    gap: '16px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  cardHeader: {
    marginBottom: '8px',
    padding: '8px',
    backgroundColor: 'rgb(26, 54, 93)',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  cardDescription: {
    color: '#555',
    fontSize: '14px',
  },
  loadMoreButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: 'rgb(26, 54, 93)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 123, 255, 0.4)',
  },
};

export default CategoryDetails;
