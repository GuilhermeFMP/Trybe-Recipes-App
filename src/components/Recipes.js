import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContextAPP from '../context/ContextAPP';
import { filterCategoryMeal } from '../service/MealAPI';
import { filterDrinkAPI } from '../service/DrinkAPI';

function Recipes(props) {
  const { mealResults, drinkResults,
    mealCatResults, drinkCatResults } = useContext(ContextAPP);
  const [results, setResults] = useState([]);
  const [resultsCategories, setResultsCategories] = useState([]);
  const [filterClicked, setFilterClicked] = useState('');

  const onHandleFilter = async (event) => {
    const { name } = props;
    if (name === 'meal') {
      if (filterClicked === event.target.value) {
        setResults(mealResults);
        return setFilterClicked('');
      }
      const mealValue = await filterCategoryMeal(event.target.value);
      setResults(mealValue);
      return setFilterClicked(event.target.value);
    }
    if (name === 'drink') {
      if (filterClicked === event.target.value) {
        setResults(drinkResults);
        return setFilterClicked('');
      }
      const drinkValue = await filterDrinkAPI(event.target.value);
      setResults(drinkValue);
      return setFilterClicked(event.target.value);
    }
  };
  const onRemoveFilter = () => {
    const { name } = props;
    if (name === 'meal') {
      setResults(mealResults);
    }
    if (name === 'drink') {
      setResults(drinkResults);
    }
  };

  useEffect(() => {
    const { name } = props;
    if (name === 'meal') {
      setResults(mealResults);
      setResultsCategories(mealCatResults);
    }
    if (name === 'drink') {
      setResults(drinkResults);
      setResultsCategories(drinkCatResults);
    }
  }, [mealResults, drinkResults, mealCatResults, drinkCatResults]);

  return (
    <div className="Card">
      {
        resultsCategories.map((categories, index) => {
          if (index > Number('4')) {
            return;
          }
          return (
            <button
              key={ index }
              data-testid={ `${categories.strCategory}-category-filter` }
              value={ categories.strCategory }
              onClick={ onHandleFilter }
            >
              {categories.strCategory}
            </button>
          );
        })
      }
      <button
        onClick={ onRemoveFilter }
        data-testid="All-category-filter"
      >
        Remove All filters

      </button>
      {
        results.map((result, index) => {
          if (index > Number('11')) {
            return;
          }
          const id = result.idDrink || result.idMeal;
          const item = result.strMeal || result.strDrink;
          const image = result.strMealThumb || result.strDrinkThumb;
          const { name } = props;
          return (
            <Link
              to={ `/${name}s/${id}` }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <div>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ image }
                  alt={ item }
                  height="40px"
                />
                <p data-testid={ `${index}-card-name` }>
                  { item }
                </p>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
}

Recipes.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Recipes;
