import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import ContextRecipe from '../context/ContextRecipe';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function InProgress() {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState({});
  const [disabled, setDisabled] = useState(true);
  const id = history.location.pathname.split('/')[2];
  const type = history.location.pathname.split('/')[1];
  const { data, checkFavorite, ready, itsMeal, quantity, localStorageSetUp,
    dataConstruction, isFavorited, favoriteRecipe,
    fetchRecipe } = useContext(ContextRecipe);

  useEffect(() => {
    const fetchResult = async () => {
      await fetchRecipe(type, id);
    };
    fetchResult();
    checkFavorite(id);
    const getItem = JSON.parse(localStorage.getItem(id));
    if (getItem) {
      setChecked(getItem);
    }
    setDisabled(true);
  }, []);

  const getIngredients = (propriedade) => Object.entries(data[0])
    .filter((str) => str[0].includes(propriedade))
    .filter((str) => str[1]);

  useEffect(() => {
    if (checked !== null || checked !== undefined) {
      const values = Object.values(checked);
      setDisabled(true);
      if (values.length === quantity) {
        const every = values.some((value) => (value === false));
        setDisabled(every);
      }
    }
  }, [checked]);

  const ingredientAndMeasure = () => {
    const measure = getIngredients('strMeasure');
    const ingredient = getIngredients('strIngredient');

    return ingredient.map((i, index) => ({
      ingredient: i[1],
      measure: measure[index] && measure[index][1],
    }));
  };

  const handleCheck = (e) => {
    const obj = {
      ...checked,
      [e.target.name]: e.target.checked,
    };
    setChecked(obj);
    const getItem = JSON.parse(localStorage.getItem(id));
    if (getItem) {
      localStorage.setItem(id, JSON.stringify(obj));
    } else {
      localStorage.setItem(id, JSON.stringify(obj));
    }
  };

  const handleCopy = () => {
    copy(`http://localhost:3000/${type}/${id}`);

    setCopied(true);
  };

  const handleFavorited = () => {
    favoriteRecipe(id);
  };

  const handleFinished = () => {
    localStorageSetUp(id, dataConstruction(data[0]));
    history.push('/done-recipes');
  };

  return (
    <div>
      <h1>Em Progresso</h1>
      { ready
        && (
          <div>
            <h1 data-testid="recipe-title">
              {data[0].strDrink || data[0].strMeal}
            </h1>
            <img
              data-testid="recipe-photo"
              src={ data[0].strMealThumb || data[0].strDrinkThumb }
              alt={ data[0].strDrink || data[0].strMeal }
              height="80px"
            />
            <form>
              {
                ingredientAndMeasure().map(({ ingredient, measure }, index) => (
                  <div key={ index }>
                    <label
                      data-testid={ `${index}-ingredient-step` }
                      htmlFor={ `${index}-ingredient-step` }
                      className={ checked[ingredient] ? 'underlined' : undefined }
                    >
                      <input
                        type="checkbox"
                        name={ ingredient }
                        onChange={ handleCheck }
                        checked={ checked[ingredient] || false }
                      />
                      { `${ingredient} ${measure}` }
                    </label>
                  </div>
                ))
              }
            </form>
            <h3 data-testid="recipe-category">
              {itsMeal === true ? data[0].strCategory : data[0].strAlcoholic}
            </h3>
            <p data-testid="instructions">
              {data[0].strInstructions}
            </p>
          </div>
        )}
      <div className="share-favorite">
        <button data-testid="share-btn" onClick={ handleCopy }>
          <img src={ shareIcon } alt="Share" />
        </button>
        { copied && <p>Link copied!</p>}
        <button
          data-testid="favorite-btn"
          onClick={ handleFavorited }
          src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
        >
          <img src={ isFavorited ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
        </button>
      </div>
      <div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disabled }
          onClick={ handleFinished }
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

export default InProgress;
