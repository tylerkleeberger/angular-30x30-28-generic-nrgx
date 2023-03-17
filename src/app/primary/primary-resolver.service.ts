import { Injectable } from '@angular/core';

import * as fromApp from '../state/app.reducer';
import * as PrimaryActions from '../primary/primary-state/primary.actions'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PrimaryModel } from './primary.model';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrimaryResolverService {

  primaryItems: PrimaryModel[];

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.store.select('primary').pipe(
      take(1),
      map(primaryState => {
        return primaryState.primaryItems;}),
      switchMap(primaryItems => {
        if (primaryItems.length === 0) {
          this.store.dispatch(PrimaryActions.fetchPrimaryItems());
          return this.actions$.pipe(
            ofType(PrimaryActions.setPrimaryItems),
            take(1)
          );
        } else {
          return of({primaryItems});
        }
      })
    );
  }
}
