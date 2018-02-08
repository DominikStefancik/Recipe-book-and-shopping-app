import { Component, OnInit } from "@angular/core";

import { RecipesBackendService } from "../recipes/recipes-backend.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private recipesBackendService: RecipesBackendService,
              private authService: AuthService) {}

  ngOnInit() {}

  onSaveData() {
    this.recipesBackendService.saveRecipes()
      .subscribe(() => {
        alert("The recipes have been successfully saved!");
      });
  }

  onFetchData() {
    this.recipesBackendService.getRecipes();
  }
}
