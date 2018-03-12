import { ActionReducerMap } from "@ngrx/store";

import { ShoppingListState, shoppingListReducer } from "../shopping-list/store/shopping-list.reducers";
import { AuthState, authReducer } from "../auth/store/auth.reducers";

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
}

// we want to register all reducers for the whole app,
// that's why the type of the map is AppState
export const appReducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
