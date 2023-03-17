
import * as fromAuth from '../login/login-state/auth.reducer'
import * as fromPrimary from '../primary/primary-state/primary.reducer'
import * as fromSecondary from '../secondary/secondary-state/secondary.reducer'

export interface AppState {
  auth: fromAuth.State;
  primary: fromPrimary.State;
  secondary: fromSecondary.State;

}
