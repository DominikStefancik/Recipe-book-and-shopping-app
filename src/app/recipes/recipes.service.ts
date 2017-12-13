import { EventEmitter } from '@angular/core';

import { Recipe } from '../domain/recipe';

export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe("A test recipe1", "Simply a test recipe1", "https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg"),
    new Recipe("A test recipe2", "Simply a test recipe2", "https://www.bensound.com/bensound-img/jazzcomedy.jpg"),
    new Recipe("A test recipe3", "Simply a test recipe3", "https://www.bensound.com/bensound-img/clearday.jpg"),
    new Recipe("A test recipe4", "Simply a test recipe4", "https://www.notetab.com/images/More-free-time-thanks-to-NoteTab.jpg")
  ];

  recipeSelected: EventEmitter<Recipe>;

  constructor () {
    this.recipeSelected = new EventEmitter<Recipe>();
  }

  getRecipes() {
    return this.recipes.slice(); // get a copy of the recipes array, so other object cannot change the original
  }
}
