import { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import ErrorBoundary from '../error-boundary/error-boundary.js';
import app from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [state, setState] = useState({ data: [] });
  useEffect(() => {
    getIngredientsData();
  }, []);

  const getIngredientsData = async () => {
    try {
      setState({ ...state, loading: true });
      const res = await fetch(API_URL);
      const resData = await res.json();
      setState({
        ...state,
        data: resData.data, loading: false
      });
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ErrorBoundary>
      <AppHeader />
      <main className={app.main}>
        <BurgerIngridients data={state.data} />
        <BurgerConstructor data={state.data} />
      </main>
    </ErrorBoundary>
  );
}

export default App;