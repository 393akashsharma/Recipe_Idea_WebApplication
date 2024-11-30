import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Initial visible categories set to 8
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate(); // To programmatically navigate on image click

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();

    // Update screenWidth state on resize
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Increase visible count by 8
  };

  const handleImageClick = (categoryName) => {
    navigate(`/category/${categoryName}`); // Navigate to CategoryDetails page
  };

  if (loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', backgroundColor: '#f4f4f4' }}>
        <div className="spinner"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  // Determine grid layout based on screen width
  let gridTemplateColumns = 'repeat(4, 1fr)'; // Default for large screens
  if (screenWidth <= 768) {
    gridTemplateColumns = 'repeat(2, 1fr)'; // For tablets and small screens
  }
  if (screenWidth <= 480) {
    gridTemplateColumns = '1fr'; // Single column for very small screens
  }

  return (
    <div>
      <div style={{ display: 'grid', gap: '16px', justifyContent: 'center', marginTop: '20px', gridTemplateColumns }}>
        {categories.slice(0, visibleCount).map((category) => (
          <div
            key={category.idCategory}
            style={{
              border: '1px solid rgb(26, 54, 93)', // Changed border color to blue
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              overflow: 'hidden',
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
            <h3 style={{
              marginBottom: '8px',
              padding: '8px',
              backgroundColor: 'rgb(26, 54, 93)',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
            }}>
              {category.strCategory}
            </h3>
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '16px',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onClick={() => handleImageClick(category.strCategory)} // Navigate on click
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <p style={{
              color: '#555',
              fontSize: '14px',
            }}>
              {category.strCategoryDescription.slice(0, 100)}... {/* Description below image */}
            </p>
          </div>
        ))}
      </div>

      {visibleCount < categories.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleLoadMore}
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

export default Category;
