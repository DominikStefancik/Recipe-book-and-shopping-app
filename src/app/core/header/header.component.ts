import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { DataStorageBackendService } from "../../shared/data-storage-backend.service";
import { AppState } from "../../store/app.reducers";
import { AuthState } from "../../auth/store/auth.reducers";
import { SignOutAction } from "../../auth/store/auth.actions";
import { FETCH_RECIPES_FROM_BACKEND,
  FetchRecipesFromBackendAction,
  StoreRecipesOnBackendAction} from "../../recipes/store/recipe.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(private dataStorageBackendService: DataStorageBackendService,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.authState = this.store.select("auth");
  }

  onSaveData(): void {
    this.store.dispatch(new StoreRecipesOnBackendAction());
  }

  onFetchData(): void {
    this.store.dispatch(new FetchRecipesFromBackendAction());
  }

  onLogout(): void {
    this.store.dispatch(new SignOutAction());
  }
}
