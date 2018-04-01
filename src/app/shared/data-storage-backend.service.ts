import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import "rxjs/add/operator/map";

import { Recipe } from "../domain/recipe";

const firebaseBackendUrl = "https://recipe-book-dc112.firebaseio.com/recipes.json";

// this class is not used anywhere, because all calls to the Firebase backand are handled via NgRx effects
// it exists only because of learning purposes
@Injectable()
export class DataStorageBackendService {
  constructor(private http: HttpClient) {}

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

      });
  }

  saveRecipes() {
    // if we want to create a request manually, this is the way
    // const request = new HttpRequest("PUT", firebaseBackendUrl, recipes,
    //                                 { params : new  HttpParams().set("auth", token), reportProgress: true });
    // return this.http.request(request);

    return this.http.put(firebaseBackendUrl, null);
  }
}
