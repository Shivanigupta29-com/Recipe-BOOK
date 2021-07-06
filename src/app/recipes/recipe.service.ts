import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';



@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  // recipes: Recipe[] = [
  //   new Recipe('Burger', 'This is our special Burger','https://m.economictimes.com/thumb/msid-72863458,width-1200,height-900,resizemode-4,imgsize-731189/burger-thnkstck.jpg',[
  //     new Ingredient('French Fries',2),
  //     new Ingredient('Coke', 2)
  //   ]),
  //   new Recipe('Pizza', 'Specialised Margherita','https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fmelissakravitz%2Ffiles%2F2017%2F02%2FDSC06921-Edit-1200x960.jpg',[
  //     new Ingredient('Mexico Taccos',1),
  //     new Ingredient('Choco Lava Cake', 2)
  //   ])
  // ];

  private recipes: Recipe[] = [];
  constructor(private slService : ShoppingListService) { }
  getRecipe(){
    return this.recipes.slice();
  }
  getRecipes(id:number){
    return this.recipes[id];
  }
  addIngredientsToShoppingList(ingredients:Ingredient[]){
      this.slService.addIngredientsToRecipe(ingredients);
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  UpdateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index ,1);
    this.recipeChanged.next(this.recipes.slice());
  }
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
