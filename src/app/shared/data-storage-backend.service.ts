import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import "rxjs/add/operator/map";

import { Recipe } from "../domain/recipe";
import { RecipesService } from "../recipes/recipes.service";

const firebaseBackendUrl = "https://recipe-book-dc112.firebaseio.com/recipes.json";

@Injectable()
export class DataStorageBackendService {
  constructor(private http: HttpClient,
              private recipesService: RecipesService) {}

  getRecipes() {
    // new HttpClient by default automatically extracts the body from a response
    // it provides a user with generic requests where he can explicitly say what type of data
    // will be returned. Hence we can call the request like this
    // 'this.http.get<Recipe[]>(firebaseBackendUrl + token)'

    return this.http.get(firebaseBackendUrl)
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
    const recipes = this.recipesService.getRecipes();

    // if we want to create a request manually, this is the way
    // const request = new HttpRequest("PUT", firebaseBackendUrl, recipes,
    //                                 { params : new  HttpParams().set("auth", token), reportProgress: true });
    // return this.http.request(request);

    return this.http.put(firebaseBackendUrl, recipes);
  }
}
