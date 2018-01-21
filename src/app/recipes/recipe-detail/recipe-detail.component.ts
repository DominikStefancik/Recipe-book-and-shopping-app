import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Recipe } from '../../domain/recipe';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private recipesService: RecipesService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.id);
      })
  }

  onAddIngredientsToShoppingList(): void {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe(): void {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['..'], { 'relativeTo' : this.route } );
  }
}
