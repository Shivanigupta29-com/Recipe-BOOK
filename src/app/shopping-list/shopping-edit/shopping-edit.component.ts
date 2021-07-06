import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 @ViewChild('f',{static:false})slForm : NgForm;
 subscription: Subscription;
 editmode = false;
 editeditemIndex:number;
 editedItem : Ingredient;
  constructor(private slService : ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index:number)=>{
      this.editeditemIndex = index;
      this.editmode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    }
    );
  }
  onAddItem(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editmode){
      this.slService.updateIngredient(this.editeditemIndex,newIngredient);
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editmode = false;
    form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editmode=false;
  }
  onDelete(){
    this.slService.deleteIngredients(this.editeditemIndex);
    this.onClear();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
} 
