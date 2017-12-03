import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../../domain/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("A test recipe1", "Simply a test recipe1", "https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg"),
    new Recipe("A test recipe2", "Simply a test recipe2", "https://www.bensound.com/bensound-img/jazzcomedy.jpg"),
    new Recipe("A test recipe3", "Simply a test recipe3", "https://www.bensound.com/bensound-img/clearday.jpg"),
    new Recipe("A test recipe4", "Simply a test recipe4", "https://www.notetab.com/images/More-free-time-thanks-to-NoteTab.jpg")
  ];

  @Output() recipeSelected: EventEmitter<Recipe>;

  constructor() {
    this.recipeSelected = new EventEmitter<Recipe>();
  }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

}
