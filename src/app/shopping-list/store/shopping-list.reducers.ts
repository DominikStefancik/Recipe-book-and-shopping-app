import * as ShoppingListActions from "./shopping-list.actions";

import { Ingredient } from "../../domain/ingredient";
import { ADD_INGREDIENT } from "./shopping-list.actions";

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient("Apple", 5),
    new Ingredient("Orange", 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
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
    case ShoppingListActions.UPDATE_INGREDIENT:
      // we update ingredient and ingredients array in an immutable way
      const index = state.editedIngredientIndex;
      const oldIngredient = state.ingredients[index];
      const updatedIngredient = {
        ...oldIngredient,
        ...action.payload
      };
      const ingredients = [...state.ingredients];
      ingredients[index] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        // after updating an ingredient, we need to setup these two properties to the default value
        editedIngredient: null,
        editedIngredientIndex: -1
      };
      case ShoppingListActions.DELETE_INGREDIENT:
      const updatedIngredients = [...state.ingredients];
      updatedIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: updatedIngredients,
        // after deleting an ingredient, we need to setup these two properties to the default value
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_INGREDIENT_EDITING:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: state.ingredients[action.payload]
      };
    case ShoppingListActions.LEAVE_SHOPPING_LIST:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    default:
      return state;
  }
}
