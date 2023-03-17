import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryComponent } from './secondary/secondary.component';
import { SecondaryEditComponent } from './secondary-edit/secondary-edit.component';
import { EffectsModule } from '@ngrx/effects';
import { SecondaryEffects } from './secondary-state/secondary.effects';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import * as fromSecondary from './secondary-state/secondary.reducer';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SecondaryComponent,
    SecondaryEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([ { path: '', component: SecondaryComponent }]),
    StoreModule.forFeature('secondary', fromSecondary.secondaryReducer),
    EffectsModule.forFeature([SecondaryEffects]),
    SharedModule
  ]
})
export class SecondaryModule { }
