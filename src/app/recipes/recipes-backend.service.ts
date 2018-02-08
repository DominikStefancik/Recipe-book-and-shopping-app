import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

import { Recipe } from "../domain/recipe";
import { RecipesService } from "./recipes.service";
import { AuthService } from "../auth/auth.service";

const firebaseBackendUrl = "https://recipe-book-dc112.firebaseio.com/recipes.json?auth=";

@Injectable()
export class RecipesBackendService {
  constructor(private http: Http,
              private recipesService: RecipesService,
              private authService: AuthService) {}

  getRecipes() {
    const token = this.authService.getToken();

    return this.http.get(firebaseBackendUrl + token)
      .map((response) => {
        const recipes: Recipe[] = response.json();
        recipes.forEach(recipe => {
          if (!recipe["ingredients"]) {
            recipe["ingredients"] = [];
          }
        });
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipesService.setRecipes(recipes);
      });
  }

  saveRecipes() {
    const token = this.authService.getToken();
    const recipes = this.recipesService.getRecipes();
    return this.http.put(firebaseBackendUrl + token, recipes);
  }
}
