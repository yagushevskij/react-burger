import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import AppHeader from '../app-header/app-header.js'
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import ErrorBoundary from '../error-boundary/error-boundary.js'
import app from './app.module.css'

const App = () => {
  return (
    <ErrorBoundary>
      <AppHeader />
      <main className={app.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngridients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </ErrorBoundary>
  )
}

export default App
