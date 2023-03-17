import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import * as fromApp from '../state/app.reducer';
import * as AuthActions from '../login/login-state/auth.actions';
import * as PrimaryActions from '../primary/primary-state/primary.actions'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  //variable to determine activity
  isAuthenticated = false;

  //variable to get Subscription and execute Observable
  private userSub: Subscription;

  //get access to NgRx Methods
  constructor(
    private store: Store<fromApp.AppState>
  ) {}


  // ---  LIFECYCLE HOOK FOR LOGIN ACCESS --- 
  ngOnInit() {
    //connect the Subscription with the Store Methods to get user
    this.userSub = this.store
    .select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user;
    })
      
  }

  onSaveData() {
    this.store.dispatch(PrimaryActions.storePrimaryItems());
  }

  onFetchData() {
    this.store.dispatch(PrimaryActions.fetchPrimaryItems());
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
