import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  private igChange : Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChange = this.shoppingListService.ingredientsChanged
    .subscribe((ingredient: Ingredient[])=>{
      this.ingredients = ingredient;
    });
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.igChange.unsubscribe();
  }
  

}
