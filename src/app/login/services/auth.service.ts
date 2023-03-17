import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/state/app.reducer';
import * as AuthActions from '../login-state/auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpirationTimer: any;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, expirationDuration)
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}
