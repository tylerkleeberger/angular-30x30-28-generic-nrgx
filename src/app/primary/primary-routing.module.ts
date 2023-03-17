import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../login/services/auth.guard';
import { PrimaryDetailComponent } from './primary-detail/primary-detail.component';
import { PrimaryEditComponent } from './primary-edit/primary-edit.component';
import { PrimaryResolverService } from './primary-resolver.service';
import { PrimaryStartComponent } from './primary-start/primary-start.component';
import { PrimaryComponent } from './primary/primary.component';

const routes: Routes = [
  {
    path: '',
    component: PrimaryComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PrimaryStartComponent },
      { path: 'new', component: PrimaryEditComponent },
      { path: ':id', component: PrimaryDetailComponent, resolve: [PrimaryResolverService]},
      { path: ':id/edit', component: PrimaryEditComponent, resolve: [PrimaryResolverService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimaryRoutingModule { }
