import ingridientPropTypes from '../../utils/type'
import ingredientDetails from './ingredient-details.module.css';

const IngredientDetails = (props) => {
  const { data } = props;
  return (
    <div className={`${ingredientDetails.wrapper} pb-15`}>
      <img className={ingredientDetails.image} src={data.image} alt={data.name}/>
      <p className='text text_type_main-default mt-4'>{data.name}</p>
      <div className={`${ingredientDetails.addition} text text_type_main-default text_color_inactive mt-8`}>
        <div className={`${ingredientDetails.addition__item} text`}>
          <span className='text_type_main-default'>Калории, ккал</span>
          <span className='text_type_digits-default mt-2'>{data.calories}</span>
        </div>
        <div className={`${ingredientDetails.addition__item}`}>
          <span className='text_type_main-default'>Белки, г</span>
          <span className='text_type_digits-default mt-2'>{data.proteins}</span>
        </div>
        <div className={`${ingredientDetails.addition__item}`}>
          <span className='text_type_main-default'>Жиры, г</span>
          <span className='text_type_digits-default mt-2'>{data.fat}</span>
        </div>
        <div className={`${ingredientDetails.addition__item}`}>
          <span className='text_type_main-default'>Углеводы, г</span>
          <span className='text_type_digits-default mt-2'>{data.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
}

ingredientDetails.propTypes = {
  data: ingridientPropTypes.isRequired
}

export default IngredientDetails;