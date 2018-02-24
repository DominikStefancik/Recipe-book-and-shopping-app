import { Component, OnInit } from "@angular/core";

import { DataStorageBackendService } from "../../shared/data-storage-backend.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageBackendService: DataStorageBackendService,
              public authService: AuthService) {}

  ngOnInit() {}

  onSaveData(): void {
    this.dataStorageBackendService.saveRecipes()
      .subscribe(() => {
        alert("The recipes have been successfully saved!");
      });
  }

  onFetchData(): void {
    this.dataStorageBackendService.getRecipes();
  }

  onLogout(): void {
    this.authService.signoutUser();
  }
}
