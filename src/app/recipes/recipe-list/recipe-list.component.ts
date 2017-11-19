import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../domain/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("A test recipe", "Simply a test recipe, nothing else", "https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg"),
    new Recipe("A test recipe", "Simply a test recipe, nothing else", "https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg"),
    new Recipe("A test recipe", "Simply a test recipe, nothing else", "https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg"),
    new Recipe("A test recipe", "Simply a test recipe, nothing else", "https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

}
