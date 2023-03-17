import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './state/app.reducer'
import * as AuthActions from './login/login-state/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
