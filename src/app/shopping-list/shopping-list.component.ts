import { Component, OnInit} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { Ingredient } from "../domain/ingredient";
import { AppState } from "../shared/store/app.state";
import { StartIngredientEditingAction, LeaveShoppingListAction } from "./store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  // type of Store has to fit the global state
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // in the select method we define a "part" of our global state
    // select returns an Observable
    this.shoppingListState = this.store.select("shoppingList");
  }

  onEditIngredient(index: number) {
    this.store.dispatch(new StartIngredientEditingAction(index));
  }
}
