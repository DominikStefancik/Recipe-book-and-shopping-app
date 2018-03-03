import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";

import { ShoppingListService } from "../shopping-list.service";
import { Ingredient } from "../../domain/ingredient";
import { AddIngredientAction } from "../store/shopping-list.actions";
import { ShoppingListType } from "../store/shopping-list.reducers";

@Component({
  selector: "app-shopping-list-edit",
  templateUrl: "./shopping-list-edit.component.html",
  styleUrls: ["./shopping-list-edit.component.css"]
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") shoppingListForm: NgForm;
  ingredientEditingStartedSubscription: Subscription;
  editMode = false;
  editingIngredientIndex: number;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<ShoppingListType>) {}

  ngOnInit() {
    this.ingredientEditingStartedSubscription = this.shoppingListService.ingredientEditingStarted.subscribe(
      (index: number) => {
        this.editingIngredientIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.ingredientEditingStartedSubscription.unsubscribe();
  }

  onAddOrUpdateIngredient(): void {
    const value = this.shoppingListForm.value;
    const newIngredient = {
      name: value.name,
      amount: value.amount
    };

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editingIngredientIndex, newIngredient);
    } else {
      this.store.dispatch(new AddIngredientAction(newIngredient));
    }

    this.onClearForm();
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editingIngredientIndex);
    this.onClearForm();
  }

  onClearForm(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
}
