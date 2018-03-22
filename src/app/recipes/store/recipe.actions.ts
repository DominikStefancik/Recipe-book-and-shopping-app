import { Action } from "@ngrx/store";

import { Recipe } from "../../domain/recipe";

export const SET_RECIPES = "SET_RECIPES";
export const ADD_RECIPE = "ADD_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

export class SetRecipesAction implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class AddRecipeAction implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipeAction implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number, updatedRecipe: Recipe }) {}
}
export class DeleteRecipeAction implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export type RecipeAction = SetRecipesAction | AddRecipeAction | UpdateRecipeAction | DeleteRecipeAction;

