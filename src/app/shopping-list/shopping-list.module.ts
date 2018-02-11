import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListService } from "./shopping-list.service";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule
  ],
  providers: [
    ShoppingListService
  ]
})
export class ShoppingListModule {}
