import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';



@Injectable()
export class SecondaryEffects {


  constructor(private actions$: Actions) {}
}
