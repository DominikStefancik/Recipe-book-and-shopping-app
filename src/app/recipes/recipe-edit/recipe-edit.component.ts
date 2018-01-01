import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../../domain/recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipesService: RecipesService) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.recipe = this.recipesService.getRecipe(id);
  }
}
