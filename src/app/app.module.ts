import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environment/environment.prod';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

import * as fromApp from './state/app.reducer'
import * as fromAuth from './login/login-state/auth.reducer'
import { AuthEffects } from './login/login-state/auth.effects';
import { PrimaryEffects } from './primary/primary-state/primary.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({auth: fromAuth.authReducer}),
    EffectsModule.forRoot([AuthEffects, PrimaryEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
    SharedModule, 
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
