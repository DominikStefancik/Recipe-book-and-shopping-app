import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Effect, Actions } from "@ngrx/effects";
import "rxjs/add/operator/switchMap";

import { FETCH_RECIPES_FROM_BACKEND, FetchRecipesFromBackendAction, SET_RECIPES } from "./recipe.actions";
import { Recipe } from "../../domain/recipe";

const firebaseBackendUrl = "https://recipe-book-dc112.firebaseio.com/recipes.json";

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions.ofType(FETCH_RECIPES_FROM_BACKEND)
    .switchMap((action: FetchRecipesFromBackendAction) => {
      return this.http.get(firebaseBackendUrl);
    })
    .map((recipes: Recipe[]) => {
      recipes.forEach(recipe => {
        if (!recipe["ingredients"]) {
          recipe["ingredients"] = [];
        }
      });

      return {
        type: SET_RECIPES,
        payload: recipes
      };
    });

  constructor(private actions: Actions,
              private http: HttpClient) {}
}
