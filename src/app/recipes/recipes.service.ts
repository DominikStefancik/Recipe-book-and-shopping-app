import { EventEmitter } from '@angular/core';

import { Recipe } from '../domain/recipe';
import { Ingredient } from '../domain/ingredient';

export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe("Tasty Schnitzel",
               "Super tasty schnitzel",
               "https://upload.wikimedia.org/wikipedia/commons/a/ae/Wiener-Schnitzel02.jpg",
               [
                 new Ingredient("Meat", 1),
                 new Ingredient("French Fries", 20)
               ]),
    new Recipe("Big fat burger",
               "Tasty but unhealthy",
               "https://upload.wikimedia.org/wikipedia/commons/6/65/Jumbo_Burger_The_Home_Chef_India.jpg",
               [
                 new Ingredient("Buns", 2),
                 new Ingredient("Meat", 1)
               ])
  ];

  recipeSelected: EventEmitter<Recipe>;

  constructor () {
    this.recipeSelected = new EventEmitter<Recipe>();
  }

  getRecipes():Recipe[] {
    return this.recipes.slice(); // get a copy of the recipes array, so other object cannot change the original
  }
}
