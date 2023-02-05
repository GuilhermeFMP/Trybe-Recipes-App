import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import LoginProvider from '../context/LoginProvider';
import APPProvider from '../context/APPProvider';
import RecipeProvider from '../context/RecipeProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <LoginProvider>
          <APPProvider>
            <RecipeProvider>
              {component}
            </RecipeProvider>
          </APPProvider>
        </LoginProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouter;
