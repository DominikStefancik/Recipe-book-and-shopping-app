import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../../domain/recipe';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private recipesService: RecipesService) { }

  ngOnInit() {
  }

  onSelected() {
    const recipeId = this.recipesService.getRecipeId(this.recipe);
    this.router.navigate([recipeId], { relativeTo: this.route });
  }
}
