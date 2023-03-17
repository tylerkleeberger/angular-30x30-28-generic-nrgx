import { createAction, props } from '@ngrx/store';
import { PrimaryModel } from '../primary.model';

export const addPrimaryItem = createAction(
  '[PrimaryItem] Add Primary Item',
  props<{
    primaryItem: PrimaryModel
  }>()
);

export const updatePrimaryItem = createAction(
  '[PrimaryItem] Update Primary Item',
  props<{
    index: number,
    primaryItem: PrimaryModel
  }>()
);

export const deletePrimaryItem = createAction(
  '[PrimaryItem] Delete Primary Item',
  props<{
    index: number
  }>()
);

export const setPrimaryItems = createAction(
  '[PrimaryItem] Set Primary Items',
  props<{
    primaryItems: PrimaryModel[]
  }>()
);

export const fetchPrimaryItems = createAction(
  '[PrimaryItem] Fetch Primary Items'
);

export const storePrimaryItems = createAction(
  '[Primary Item] Store Primary Items'
);
