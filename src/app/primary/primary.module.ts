import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimaryRoutingModule } from './primary-routing.module';
import { PrimaryEditComponent } from './primary-edit/primary-edit.component';
import { PrimaryListComponent } from './primary-list/primary-list.component';
import { PrimaryItemComponent } from './primary-list/primary-item/primary-item.component';
import { EffectsModule } from '@ngrx/effects';
import { PrimaryEffects } from './primary-state/primary.effects';
import { PrimaryDetailComponent } from './primary-detail/primary-detail.component';
import { PrimaryStartComponent } from './primary-start/primary-start.component';
import { PrimaryComponent } from './primary/primary.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import * as fromPrimary from './primary-state/primary.reducer'
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PrimaryEditComponent,
    PrimaryListComponent,
    PrimaryItemComponent,
    PrimaryDetailComponent,
    PrimaryStartComponent,
    PrimaryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    PrimaryRoutingModule,
    StoreModule.forFeature('primary', fromPrimary.primaryItemReducer),
  ]
})
export class PrimaryModule { }
