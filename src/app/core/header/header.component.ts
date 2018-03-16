import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { DataStorageBackendService } from "../../shared/data-storage-backend.service";
import { AuthService } from "../../auth/auth.service";
import { AppState } from "../../store/app.reducers";
import { AuthState } from "../../auth/store/auth.reducers";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(private dataStorageBackendService: DataStorageBackendService,
              private authService: AuthService,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.authState = this.store.select("auth");
  }

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
