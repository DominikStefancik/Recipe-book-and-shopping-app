import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";

import { FETCH_RECIPES_FROM_BACKEND, FetchRecipesFromBackendAction, SET_RECIPES,
  STORE_RECIPES_ON_BACKEND, StoreRecipesOnBackendAction } from "./recipe.actions";
import { Recipe } from "../../domain/recipe";
import { FeatureState } from "./recipe.reducers";

const firebaseBackendUrl = "https://recipe-book-dc112.firebaseio.com/recipes.json";

@Injectable()
export class RecipeEffects {
  @Effect()
  recipesFetch = this.actions.ofType(FETCH_RECIPES_FROM_BACKEND)
    .switchMap((action: FetchRecipesFromBackendAction) => { // get data from the backend
      return this.http.get(firebaseBackendUrl);
    })
    .map((recipes: Recipe[]) => {
      recipes.forEach(recipe => {
        if (!recipe["ingredients"]) {
          recipe["ingredients"] = [];
        }
      });

      return { // and then dispatch an action to set fetched recipes
        type: SET_RECIPES,
        payload: recipes
      };
    });

  @Effect({ dispatch: false })
  recipesStore = this.actions
    .ofType(STORE_RECIPES_ON_BACKEND) // compbine action of storing recipes
    .withLatestFrom(this.store.select("recipes")) // with getting recipes from the app state
    .switchMap(([action, recipeState]) => {
      const recipes = recipeState.recipes;
      return this.http.put(firebaseBackendUrl, recipes);
    });

  constructor(private actions: Actions,
              private http: HttpClient,
              private store: Store<FeatureState>) {}
}
