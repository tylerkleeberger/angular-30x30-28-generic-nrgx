import { Component, OnInit } from '@angular/core';

import * as fromApp from 'src/app/state/app.reducer';
import * as PrimaryActions from '../primary-state/primary.actions';
import * as SecondaryActions from '../../secondary/secondary-state/secondary.actions';
import { PrimaryModel } from '../primary.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-primary-detail',
  templateUrl: './primary-detail.component.html',
  styleUrls: ['./primary-detail.component.css']
})
export class PrimaryDetailComponent implements OnInit{
  primaryItem: PrimaryModel;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('primary');
      }),
      map(primaryState => {
        return primaryState.primaryItems.find((primaryItem, index) => {
          return index === this.id;
        })
      })
    )
    .subscribe(primaryItem => {
      this.primaryItem = primaryItem;
    })
  }

  onAddtoSecondaryItems() {
    this.store.dispatch(
      SecondaryActions.addSecondaryItems({secondaryItems: this.primaryItem.secondaryItems})
    );
  }

  onEditPrimaryItem() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePrimaryItem() {
    this.store.dispatch(PrimaryActions.deletePrimaryItem({index: this.id}));
    this.router.navigate(['/primary']);
  }

}
