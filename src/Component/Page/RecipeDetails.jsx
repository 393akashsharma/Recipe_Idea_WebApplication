import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) throw new Error('Failed to fetch recipe details');
        const data = await response.json();
        setRecipe(data.meals[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (loading) {
    return (
      <LoadingMessage>
        <Spinner />
      </LoadingMessage>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  return (
    <RecipeContainer className="recipe-details">
      <RecipeContent>
        <RecipeImageContainer>
          <RecipeImage src={recipe.strMealThumb} alt={recipe.strMeal} />
        </RecipeImageContainer>
        <RecipeInfo>
          <h1>{recipe.strMeal}</h1>
          <p className="category"><strong>Category:</strong> {recipe.strCategory}</p>
          <p className="cuisine"><strong>Cuisine:</strong> {recipe.strArea}</p>
          <p className="tags"><strong>Tags:</strong> {recipe.strTags || 'No tags available'}</p>
          <RecipeInstructions>
            <h3>Instructions:</h3>
            <p>{recipe.strInstructions}</p>
          </RecipeInstructions>
          <IngredientsContainer>
            <h3>Ingredients:</h3>
            <IngredientsList>
              <ul>
                {ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </IngredientsList>
          </IngredientsContainer>
        </RecipeInfo>
      </RecipeContent>
      {recipe.strYoutube && (
        <VideoContainer>
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="youtube-link">
            <YouTubeButton>Watch on YouTube</YouTubeButton>
          </a>
        </VideoContainer>
      )}
    </RecipeContainer>
  );
};

// Styled components

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid transparent;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

const RecipeContainer = styled.div`
  max-width: 1129px;
  margin: 47px auto;
  padding: 39px;
  background: linear-gradient(135deg, #3f5164, #4d6883);
  border-radius: 33px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const RecipeContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RecipeInfo = styled.div`
  flex: 2;
  padding-right: 30px;

  h1 {
    font-size: 36px;
    color: white !important;  /* Set color to white */
    margin-bottom: 15px;
  }

  h3 {
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 12px;
  }

  p {
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    padding-right: 0;

    h1 {
      font-size: 24px;
    }

    p {
      font-size: 12px;
    }
  }
`;

const RecipeImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;  /* Added margin for spacing */

  @media (max-width: 768px) {
    margin: 10px auto;
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  border: 5px solid white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const RecipeInstructions = styled.div`
  margin-bottom: 30px;

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #ffffff;
    text-align: justify;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const IngredientsContainer = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 15px;

    h3 {
      font-size: 16px;
    }
  }
`;

const IngredientsList = styled.div`
  ul {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    font-size: 1.2rem;
    color: #ffffff;
    padding: 8px 0;
    border-bottom: 1px solid #7f8c8d;
  }

  @media (max-width: 768px) {
    li {
      font-size: 1rem;
    }
  }
`;

const VideoContainer = styled.div`
  margin-top: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const YouTubeButton = styled.button`
  background-color: #ff0b0b;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 16px;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e60000;
  }
`;

const ErrorMessage = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 80px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #bdc3c7;
  margin-top: 80px;
  font-weight: 500;
`;

export default RecipeDetails;
