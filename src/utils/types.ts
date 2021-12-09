interface IIngredientType {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v?: number;
}

interface IMainCardType extends IIngredientType {
  qty: number;
}

interface IConCardType extends IIngredientType {
  readonly key: string;
}

type TStringFunc = () => string
type TOnSubmitCallback = (event: React.SyntheticEvent) => void

export type { IConCardType, IMainCardType, IIngredientType, TOnSubmitCallback, TStringFunc }
