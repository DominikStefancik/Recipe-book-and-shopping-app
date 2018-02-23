import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import "rxjs/add/operator/map";

import { Recipe } from "../domain/recipe";
import { RecipesService } from "./recipes.service";
import { AuthService } from "../auth/auth.service";

const firebaseBackendUrl = "https://recipe-book-dc112.firebaseio.com/recipes.json";

@Injectable()
export class RecipesBackendService {
  constructor(private http: HttpClient,
              private recipesService: RecipesService,
              private authService: AuthService) {}

  getRecipes() {
    const token = this.authService.getToken();

    // new HttpClient by default automatically extracts the body from a response
    // it provides a user with generic requests where he can explicitly say what type of data
    // will be returned. Hence we can call the request like this
    // 'this.http.get<Recipe[]>(firebaseBackendUrl + token)'

    return this.http.get(firebaseBackendUrl, { params : new  HttpParams().set("auth", token) })
      .map((recipes: Recipe[]) => {
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
    return this.http.put(firebaseBackendUrl, recipes, { params : new  HttpParams().set("auth", token) });
  }
}
