import { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import ErrorBoundary from '../error-boundary/error-boundary.js';
import app from './app.module.css';
import { BasketContext } from '../../services/basket-context.js';

const API_URL = 'https://norma.nomoreparties.space/api/';

const App = () => {
  const [ingredients, setIngredients] = useState({ data: [] });
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    getIngredientsData();
  }, []);

  const getIngredientsData = async () => {
    try {
      setIngredients({ ...ingredients, loading: true });
      const res = await fetch(API_URL + 'ingredients');
      const resData = await res.json();
      setIngredients({
        ...ingredients,
        data: resData.data, loading: false
      });
      setBasket(resData.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ErrorBoundary>
      <AppHeader />
      <main className={app.main}>
        <BasketContext.Provider value={{ basket, setBasket }}>
          <BurgerIngridients data={ingredients.data} />
          <BurgerConstructor />
        </BasketContext.Provider>
      </main>
    </ErrorBoundary>
  );
}

export default App;
export { API_URL };