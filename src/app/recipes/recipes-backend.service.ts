import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

import { Recipe } from "../domain/recipe";
import { RecipesService } from "./recipes.service";

const firebaseBackendUrl = "https://recipe-book-dc112.firebaseio.com/recipes.json";

@Injectable()
export class RecipesBackendService {
  constructor(private http: Http,
              private recipesService: RecipesService) {}

  getRecipes() {
    return this.http.get(firebaseBackendUrl)
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
    const recipes = this.recipesService.getRecipes();
    return this.http.put(firebaseBackendUrl, recipes);
  }
}
