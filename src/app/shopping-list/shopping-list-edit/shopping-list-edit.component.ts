import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../domain/ingredient';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") shoppingListForm: NgForm;
  ingredientEditingStartedSubscription: Subscription;
  editMode: boolean = false;
  editingIngredientIndex: number;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientEditingStartedSubscription = this.shoppingListService.ingredientEditingStarted.subscribe(
      (index: number) => {
        this.editingIngredientIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
      }
    )
  }

  ngOnDestroy() {
    this.ingredientEditingStartedSubscription.unsubscribe();
  }

  onAddOrUpdateIngredient():void {
    const value = this.shoppingListForm.value;
    const newIngredient = {
      name: value.name,
      amount: value.amount
    }

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editingIngredientIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.shoppingListForm.reset();
    this.editMode = false;
  }
}
