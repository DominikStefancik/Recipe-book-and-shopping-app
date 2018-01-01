import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../../domain/recipe';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipesService: RecipesService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.recipe = this.recipesService.getRecipe(+params['id']);
      })
  }

  onAddIngredientsToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
