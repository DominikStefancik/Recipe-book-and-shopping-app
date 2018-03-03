import * as ShoppingListActions from "./shopping-list.actions";

import { Ingredient } from "../../domain/ingredient";
import { ADD_INGREDIENT } from "./shopping-list.actions";

export interface ShoppingListType {
  shoppingList: { ingredients: Ingredient[] };
}

const initialState = {
  ingredients: [
    new Ingredient("Apple", 5),
    new Ingredient("Orange", 10)
  ]
};

// reducer is run everytime by ngrx when an action is dispatched
// parameters "state" and "action" are passed to the reducer automatically by ngrx
// the initial state is important for the first call of the reducer
// each reducer has to return a new state of the application
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListAction) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // copy all properties of the "state" object
        ingredients: [...state.ingredients, action.payload] // overwrite ingredients property by adding a new one
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    default:
      return state;
  }
}
