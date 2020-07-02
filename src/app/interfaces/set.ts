import { firestore } from 'firebase';

export interface Set {
  setId: string;
  userId: string;
  setTitle: string;
  meal: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  foodsArray?: [];
  setCal: number;
  setProtein: number;
  setFat: number;
  setTotalCarbohydrate: number;
  setDietaryFiber: number;
  setSugar: number;
  updatedAt: firestore.Timestamp;
}
