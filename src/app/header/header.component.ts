import { Component, OnInit } from '@angular/core';

import { RecipesBackendService } from '../recipes/recipes-backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private recipesBackendService: RecipesBackendService) {}

  ngOnInit() {}

  onSaveData() {
    this.recipesBackendService.saveRecipes()
      .subscribe(() => {
        alert('The recipes have been successfully saved!')
      });
  }
}
