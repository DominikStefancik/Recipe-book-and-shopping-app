import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild("f") shoppingListForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
  }

  onAddItem():void {
    const value = this.shoppingListForm.value;
    this.shoppingListService.addIngredient({
      name: value.name,
      amount: value.amount
    });
  }
}
