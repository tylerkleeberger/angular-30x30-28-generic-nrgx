import { Actions } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { SecondaryModel } from 'src/app/shared/secondary.model';

import * as SecondaryActions from './secondary.actions'

export interface State {
  secondaryItems: SecondaryModel[];
  editIndex: number;
}

export const initialState: State = {
  secondaryItems: [
    new SecondaryModel('Secondary Item Test 01', 1),
    new SecondaryModel('Secondary Item Test 02', 20)
  ],
  editIndex: -1
};

const _secondaryReducer = createReducer(
  initialState,

  on(
    SecondaryActions.addSecondaryItem,
    (state, action) => ({
      ...state,
      secondaryItems: state.secondaryItems.concat(action.secondaryItem)
    })
  ),

  on(
    SecondaryActions.addSecondaryItems,
    (state, action) => ({
      ...state,
      secondaryItems: state.secondaryItems.concat(...action.secondaryItems)
    })
  ),

  on(
    SecondaryActions.updateSecondaryItem,
    (state, action) => ({
      ...state,
      editIndex: -1,
      secondaryItems: state.secondaryItems.map(
        (secondaryItem, index) => index === state.editIndex ? { ...action.secondaryItem } : secondaryItem
      )
    })
  ),

  on(
    SecondaryActions.deleteSecondaryItem,
    (state) => ({
      ...state,
      editIndex: -1,
      secondaryItems: state.secondaryItems.filter(
        (_, index) => index !== state.editIndex
      )
    })
  ),

  on(
    SecondaryActions.startEdit,
    (state, action) => ({
      ...state, editIndex:
      action.index
    })
  ),

  on(
    SecondaryActions.stopEdit,
    (state) => ({
      ...state, editIndex: -1
    })
  )

);

export function secondaryReducer(state: State, action: Action) {
  return _secondaryReducer(state, action);
}
