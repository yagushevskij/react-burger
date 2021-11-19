import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngridients from '../../components/burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.js'
import style from './home.module.css'
import {Navigate, useLocation} from 'react-router-dom'

const Home = () => {
  // const []
  const location = useLocation()
  console.log(location)
  // <Navigate replace to={'/login'} state={{ from: location }} />
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
