import { Action } from "@ngrx/store";

import { Recipe } from "../../domain/recipe";

export const SET_RECIPES = "SET_RECIPES";
export const ADD_RECIPE = "ADD_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const FETCH_RECIPES_FROM_BACKEND = "FETCH_RECIPES_FROM_BACKEND";
export const STORE_RECIPES_TO_BACKEND = "STORE_RECIPES_TO_BACKEND";

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

export class FetchRecipesFromBackendAction implements Action {
  readonly type = FETCH_RECIPES_FROM_BACKEND;
}

// we don't need a payload here, we can get the recipes which we want to store
// from the RecipeState
export class StoreRecipesToBackendAction implements Action {
  readonly type = STORE_RECIPES_TO_BACKEND;
}

export type RecipeAction = SetRecipesAction | AddRecipeAction | UpdateRecipeAction | DeleteRecipeAction
    | FetchRecipesFromBackendAction | StoreRecipesToBackendAction;
