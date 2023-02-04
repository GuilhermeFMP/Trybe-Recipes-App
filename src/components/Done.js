import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareSvg from '../images/shareIcon.svg';

function Done() {
  const [copied, setCopied] = useState('');
  const [filter, setFilter] = useState([]);
  const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const handleClick = (id, type) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    copy(url);
    setCopied('Link copied!');
  };

  const handleFilter = (category) => {
    const newFilter = getLocalStorage.filter((recipe) => recipe.type === category);
    setFilter(newFilter);
  };

  const resetFilter = () => {
    setFilter([]);
  };

  return (
    <div>
      <button data-testid="filter-by-all-btn" onClick={ resetFilter }>All</button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilter('meal') }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('drink') }
      >
        Drinks

      </button>
      {filter.length >= 1 ? (
        filter.map((recipe, index) => {
          const tags = typeof recipe.tags === 'string'
            ? recipe.tags.split(',') : recipe.tags;
          return (
            <div key={ recipe.id }>
              <div>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt="imagem da receita"
                    data-testid={ `${index}-horizontal-image` }
                    width={ 80 }
                    height={ 80 }
                  />
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`}
                </p>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </p>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </p>
                {recipe.type === 'meal'
                && (
                  tags.map((tag) => (
                    <p
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      { tag }
                    </p>))
                )}
              </div>
              <div>
                <button
                  onClick={ () => handleClick(recipe.id, recipe.type) }
                >
                  <img
                    src={ shareSvg }
                    alt="share button"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                  {copied}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        getLocalStorage.map((recipe, index) => {
          const tags = typeof recipe.tags === 'string'
            ? recipe.tags.split(',') : recipe.tags;
          return (
            <div key={ recipe.id }>
              <div>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt="imagem da receita"
                    data-testid={ `${index}-horizontal-image` }
                    width={ 80 }
                    height={ 80 }
                  />
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`}
                </p>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </p>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </p>
                {recipe.type === 'meal'
                && (
                  tags.map((tag) => (
                    <p
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      { tag }
                    </p>))
                )}
              </div>
              <div>
                <button onClick={ () => handleClick(recipe.id, recipe.type) }>
                  <img
                    src={ shareSvg }
                    alt="share button"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                  {copied}
                </button>
              </div>
            </div>
          );
        })
      )}

    </div>
  );
}

export default Done;
