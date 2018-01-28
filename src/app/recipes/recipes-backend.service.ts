import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from '../domain/recipe';
import { RecipesService } from './recipes.service'

const firebaseBackendUrl = 'https://recipe-book-dc112.firebaseio.com/recipes.json';

@Injectable()
export class RecipesBackendService {
  constructor(private http: Http,
              private recipesService: RecipesService) {}

  getRecipes() {
    return this.http.get(firebaseBackendUrl)
      .subscribe((response) => {
        const recipes: Recipe[] = response.json();
        this.recipesService.setRecipes(recipes);
      });
  }

  saveRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http.put(firebaseBackendUrl, recipes);
  }
}
