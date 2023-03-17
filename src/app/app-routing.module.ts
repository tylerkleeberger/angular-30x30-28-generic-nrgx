import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/primary', pathMatch: 'full' },
  {
    path: 'primary',
    loadChildren: () => 
      import('./primary/primary.module').then(m => m.PrimaryModule)
  },
  {
    path: 'secondary',
    loadChildren: () =>
      import('./secondary/secondary.module').then(m => m.SecondaryModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./login/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
