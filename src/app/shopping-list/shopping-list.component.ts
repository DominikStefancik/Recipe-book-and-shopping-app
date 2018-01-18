import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../domain/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged
          .subscribe((ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
          })
  }

  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  onEditIngredient(index: number): void {
    this.shoppingListService.ingredientEditingStarted.next(index);
  }
}
