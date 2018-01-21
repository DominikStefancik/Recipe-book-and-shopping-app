import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../../domain/recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipesService: RecipesService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        if (this.editMode) {
          this.recipe = this.recipesService.getRecipe(this.id);
        }

        this.initForm();
      });
  }

  private initForm(): void {
    const recipeName = this.editMode ? this.recipe.name : '';
    const recipeImageUrl = this.editMode ? this.recipe.imageUrl : '';
    const recipeDescription = this.editMode ? this.recipe.description : '';
    const recipeIngredients =
            this.editMode ? this.recipe.ingredients
                                       .map(ingredient => this.createIngredientRow(ingredient.name, ingredient.amount))
                          : [];

    this.recipeForm = this.formBuilder.group({
      'name' : this.formBuilder.control(recipeName),
      'imageUrl' : this.formBuilder.control(recipeImageUrl),
      'description' : this.formBuilder.control(recipeDescription),
      'ingredients' : this.formBuilder.array(recipeIngredients)
    });
  }

  private createIngredientRow(name: string, amount: number): FormGroup {
    return this.formBuilder.group({
      'name' : this.formBuilder.control(name),
      'amount' : this.formBuilder.control(amount)
    });
  }

  onSave(): void {
    console.log(this.recipeForm);
  }

  onAddIngredient(): void {
    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    ingredients.push(this.createIngredientRow(null, null));
  }
}
