interface IIngredientType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
}

interface IMainCardType extends IIngredientType {
  qty: number;
}

interface IConCardType extends IIngredientType {
  key: string;
}

type TStringFunc = () => string
type TOnSubmitCallback = (event: React.SyntheticEvent) => void

export type { IConCardType, IMainCardType, IIngredientType, TOnSubmitCallback, TStringFunc }
