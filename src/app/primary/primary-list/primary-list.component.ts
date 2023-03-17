import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { PrimaryModel } from '../primary.model';

import * as fromApp from '../../state/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-primary-list',
  templateUrl: './primary-list.component.html',
  styleUrls: ['./primary-list.component.css']
})
export class PrimaryListComponent implements OnInit, OnDestroy{

  primaryItems: PrimaryModel[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('primary')
      .pipe(map(primaryState => primaryState.primaryItems))
      .subscribe((primaryItems: PrimaryModel[]) => {
        this.primaryItems = primaryItems;
      });
  }

  newPrimaryItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
