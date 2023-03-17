import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import * as fromApp from '../../state/app.reducer';
import * as PrimaryActions from '../primary-state/primary.actions';

@Component({
  selector: 'app-primary-edit',
  templateUrl: './primary-edit.component.html',
  styleUrls: ['./primary-edit.component.css']
})
export class PrimaryEditComponent implements OnInit{

  id: number;
  editMode: boolean = false;
  primaryItemForm: FormGroup;

  private storeSub: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(PrimaryActions.updatePrimaryItem({index: this.id, primaryItem: this.primaryItemForm.value}))
    } else {
      this.store.dispatch(PrimaryActions.addPrimaryItem({primaryItem: this.primaryItemForm.value}))
    }
    this.cancelEdit();
  }

  addSecondaryItem() {
    (this.primaryItemForm.get('secondaryItems') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  deleteSecondaryItem(index: number) {
    (this.primaryItemForm.get('secondaryItems') as FormArray).removeAt(index)
  }

  cancelEdit() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let primaryItemName = '';
    let primaryItemDescription = '';
    let primaryItemSecondaryItems = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store.select('primary').pipe(map(primaryState => {
        return primaryState.primaryItems.find((primaryItem, index) => {
          return index === this.id;
        });
      })
      )
      .subscribe(primaryItem => {
        primaryItemName = primaryItem.name;
        primaryItemDescription = primaryItem.description;
      if (primaryItem['secondaryItems']) {
        for (let secondaryItem of primaryItem.secondaryItems) {
          primaryItemSecondaryItems.push(
            new FormGroup({
              name: new FormControl(secondaryItem.name, Validators.required),
              amount: new FormControl(secondaryItem.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
      });
      }

    this.primaryItemForm = new FormGroup({
      name: new FormControl(primaryItemName, Validators.required),
      description: new FormControl(primaryItemDescription, Validators.required),
      secondaryItems: primaryItemSecondaryItems
    });
  }

  get controls() {
    return (this.primaryItemForm.get('secondaryItems') as FormArray).controls
  }
}