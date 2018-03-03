import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";

import { Ingredient } from "../../domain/ingredient";
import { AddIngredientAction, DeleteIngredientAction, UpdateIngredientAction,
  LeaveShoppingListAction } from "../store/shopping-list.actions";
import { AppState } from "../../shared/store/app.state";

@Component({
  selector: "app-shopping-list-edit",
  templateUrl: "./shopping-list-edit.component.html",
  styleUrls: ["./shopping-list-edit.component.css"]
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") shoppingListForm: NgForm;
  storeSubscription: Subscription;
  editMode = false;
  editedIngredient: Ingredient;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.storeSubscription = this.store.select("shoppingList").subscribe(
      (data) => {
        if (data.editedIngredientIndex !== -1) {
          this.editMode = true;
          this.editedIngredient = data.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new LeaveShoppingListAction());
    this.storeSubscription.unsubscribe();
  }

  onAddOrUpdateIngredient(): void {
    const value = this.shoppingListForm.value;
    const newIngredient = {
      name: value.name,
      amount: value.amount
    };

    if (this.editMode) {
      this.store.dispatch(new UpdateIngredientAction(newIngredient));
    } else {
      this.store.dispatch(new AddIngredientAction(newIngredient));
    }

    this.onClearForm();
  }

  onDeleteIngredient() {
    this.store.dispatch(new DeleteIngredientAction());
    this.onClearForm();
  }

  onClearForm(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
}
