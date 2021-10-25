import { useEffect, useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import ErrorBoundary from '../error-boundary/error-boundary.js';
import app from './app.module.css';
import { IngredientsContext } from '../../services/app-context.js';
import { API_URL } from '../../utils/config.js';

const App = () => {
  const [ingredients, setIngredients] = useState({ data: [] });

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
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ErrorBoundary>
      <AppHeader />
      <main className={app.main}>
        <DndProvider backend={HTML5Backend}>
          <IngredientsContext.Provider value={{ data: ingredients.data }}>
            <BurgerIngridients />
            <BurgerConstructor />
          </IngredientsContext.Provider>
        </DndProvider>
      </main>
    </ErrorBoundary>
  );
}

export default App;
export { API_URL };