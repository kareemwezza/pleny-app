import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'home', component: ProductListComponent, canActivate: [authGuard] }
];
