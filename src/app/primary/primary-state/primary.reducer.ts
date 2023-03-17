import { Action, createReducer, on } from '@ngrx/store';

import * as PrimaryActions from '../primary-state/primary.actions';
import { PrimaryModel } from '../primary.model';



export interface State {
  primaryItems: PrimaryModel[];

}

export const initialState: State = {
  primaryItems: []
};

export const _primaryItemReducer = createReducer(
  initialState,

  on(
    PrimaryActions.addPrimaryItem,
    (state, action) => ({
      ...state,
      primaryItems: state.primaryItems.concat({...action.primaryItem})
    })
  ),

  on(
    PrimaryActions.updatePrimaryItem,
    (state, action) => ({
      ...state,
      primaryItems: state.primaryItems.map(
        (primaryItem, index) => index === action.index ? { ...action.primaryItem } : primaryItem
      )
    })
  ),

  on(
    PrimaryActions.deletePrimaryItem,
    (state, action) => ({
      ...state,
      primaryItems: state.primaryItems.filter(
        (_, index) => index !== action.index
      )
    })
  ),

  on(
    PrimaryActions.setPrimaryItems,
    (state, action) => ({
      ...state,
      primaryItems: [...action.primaryItems]
    })
  )
);

export function primaryItemReducer(state: State, action: Action) {
  return _primaryItemReducer(state, action);
}