import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngridients from '../../components/burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.js'
import style from './home.module.css'

const Home = () => {
  return (
    <main className={style.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngridients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}

export default Home
