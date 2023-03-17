import { Component, OnInit } from '@angular/core';

import * as SecondaryActions from '../secondary-state/secondary.actions';
import * as fromApp from '../../state/app.reducer';
import { Observable } from 'rxjs';
import { SecondaryModel } from 'src/app/shared/secondary.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.css']
})
export class SecondaryComponent implements OnInit{

  secondaryItems: Observable<{ secondaryItems: SecondaryModel[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
      this.secondaryItems = this.store.select('secondary');
  }

  editSecondaryItem(index: number) {
    this.store.dispatch(SecondaryActions.startEdit({index}));
  }

}
