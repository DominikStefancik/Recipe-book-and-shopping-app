import { Recipe } from "../../domain/recipe";
import { Ingredient } from "../../domain/ingredient";
import { RecipeAction, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, SET_RECIPES } from "./recipe.actions";
import { AppState } from "../../store/app.reducers";

// this feature state is used to register lazily loaded part of the app
export interface FeatureState extends AppState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [
    new Recipe("Tasty Schnitzel",
               "Super tasty schnitzel",
               "https://upload.wikimedia.org/wikipedia/commons/a/ae/Wiener-Schnitzel02.jpg",
               [
                 new Ingredient("Meat", 1),
                 new Ingredient("French Fries", 20)
               ]),
    new Recipe("Big fat burger",
               "Tasty but unhealthy",
               "https://upload.wikimedia.org/wikipedia/commons/6/65/Jumbo_Burger_The_Home_Chef_India.jpg",
               [
                 new Ingredient("Buns", 2),
                 new Ingredient("Meat", 1)
               ]),
    new Recipe("Strawberry and Kiwi cake",
               "Delicious",
               "https://upload.wikimedia.org/wikipedia/commons/6/67/Pavlova_dessert.JPG",
               [
                 new Ingredient("Strawberries", 30),
                 new Ingredient("Kiwis", 20),
                 new Ingredient("Flour", 1)
               ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeAction) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };
    case DELETE_RECIPE:
      const recipes = [...state.recipes];
      recipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: recipes
      };
    default:
      return state;
  }
}
