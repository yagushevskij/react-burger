import React from 'react';

import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import app from './app.module.css';
import { data } from '../../utils/data.js';
import { basket } from '../../utils/data.js';

class App extends React.Component {
  render() {
    return (
      <>
      <AppHeader />
      <main className={app.main}>
        <BurgerIngridients data={data} />
        <BurgerConstructor data={basket}/>
      </main>
      </>
    );
  }
}

export default App;