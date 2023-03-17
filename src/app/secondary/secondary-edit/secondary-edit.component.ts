import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import * as SecondaryActions from '../secondary-state/secondary.actions';
import * as fromApp from '../../state/app.reducer';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SecondaryModel } from 'src/app/shared/secondary.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-secondary-edit',
  templateUrl: './secondary-edit.component.html',
  styleUrls: ['./secondary-edit.component.css']
})
export class SecondaryEditComponent implements OnInit, OnDestroy{

  @ViewChild('f', {static: false}) secondaryForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: SecondaryModel;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('secondary')
      .subscribe(stateData => {
        const index = stateData.editIndex;
        if (index > -1) {
          this.editMode = true;
          this.editedItem = stateData.secondaryItems[index];
          this.secondaryForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const secondaryItem = new SecondaryModel(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(SecondaryActions.updateSecondaryItem({secondaryItem}));
    } else {
      this.store.dispatch(SecondaryActions.addSecondaryItem({secondaryItem}))
    } 
    this.editMode = false;
    form.reset();
  }

  clearForm() {
    this.secondaryForm.reset();
    this.editMode = false;
    this.store.dispatch(SecondaryActions.stopEdit());
  }

  deleteItem() {
    this.store.dispatch(SecondaryActions.deleteSecondaryItem());    
    this.clearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(SecondaryActions.stopEdit());
  }


}
