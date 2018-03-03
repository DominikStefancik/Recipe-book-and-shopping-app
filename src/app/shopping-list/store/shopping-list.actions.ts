import { Action } from "@ngrx/store";
import { Ingredient } from "../../domain/ingredient";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const START_INGREDIENT_EDITING = "START_INGREDIENT_EDITING";
export const LEAVE_SHOPPING_LIST = "LEAVE_SHOPPING_LIST";

export class AddIngredientAction implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredientsAction implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredientAction implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredientAction implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartIngredientEditingAction implements Action {
  readonly type = START_INGREDIENT_EDITING;

  constructor(public payload: number) {}
}

export class LeaveShoppingListAction implements Action {
  readonly type = LEAVE_SHOPPING_LIST;
}

export type ShoppingListAction = AddIngredientAction | AddIngredientsAction | UpdateIngredientAction
                | DeleteIngredientAction | StartIngredientEditingAction | LeaveShoppingListAction;
