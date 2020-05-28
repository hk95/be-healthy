export interface MySet {
  setId: string;
  setImage: string;
  setTitle: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  setFoods: SetFood;
  amount: string;
}

export interface SetFood {
  foodId: string;
  amount: number;
}
