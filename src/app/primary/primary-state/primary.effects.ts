import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as PrimaryActions from './primary.actions';
import * as fromApp from '../../state/app.reducer';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { PrimaryModel } from '../primary.model';



@Injectable()
export class PrimaryEffects {

  fetchPrimaryItems$ = createEffect(() => 
  this.actions$.pipe(
    ofType(PrimaryActions.fetchPrimaryItems),
    switchMap(() => {
      return this.http.get<PrimaryModel[]>(
        'https://AIzaSyDiIvr1VfcLQq8vJbs_91UCy2Xb-H6Ez2A.firebaseio.com/primaryItems.json'
      );
    }),
    map(primaryItems => {
      return primaryItems.map(primaryItems => {
        return {
          ...primaryItems,
          secondaryItems: primaryItems.secondaryItems ? primaryItems.secondaryItems : []
        };
      });
    }),
    map(primaryItems => {
      return PrimaryActions.setPrimaryItems({primaryItems});
    })
  ));

  storePrimaryItems$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PrimaryActions.storePrimaryItems),
    withLatestFrom(this.store.select('primary')),
    switchMap(([actionData, primaryItemsState]) => {
      return this.http.put(
        'https://AIzaSyDiIvr1VfcLQq8vJbs_91UCy2Xb-H6Ez2A.firebaseio.com/primaryItems.json', primaryItemsState.primaryItems
      );
    })
  ),
  { dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
    ) {}
}
