import { createAction, props } from '@ngrx/store';
import { SecondaryModel } from 'src/app/shared/secondary.model';

export const addSecondaryItem = createAction(
  '[Secondary] Add Secondary Item',
  props<{
    secondaryItem: SecondaryModel
  }>()
);

export const addSecondaryItems = createAction(
  '[Secondary] Add Secondary Items',
  props<{
    secondaryItems: SecondaryModel[]
  }>()
);

export const updateSecondaryItem = createAction(
  '[Secondary] Update Secondary Item',
  props<{
    secondaryItem: SecondaryModel
  }>()
);

export const deleteSecondaryItem = createAction(
  '[Secondary] Delete Secondary Item',
)

export const startEdit = createAction(
  '[Secondary] Start Edit',
  props<{
    index: number
  }>()
);

export const stopEdit = createAction(
  '[Secondary] Stop Edit'
);
