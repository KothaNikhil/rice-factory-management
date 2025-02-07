import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { FirmAuthFormComponent } from './modules/firm-auth/firm-auth-form/firm-auth-form.component';

const routes: Routes = [
  { path: 'stock', loadChildren: () => import('./modules/stock-management/stock-management.module').then(m => m.StockManagementModule), canActivate: [authGuard] },
  { path: 'transactions', loadChildren: () => import('./modules/transactions/transactions.module').then(m => m.TransactionsModule), canActivate: [authGuard] },
  { path: 'login', component: FirmAuthFormComponent },
  { path: 'register', component: FirmAuthFormComponent },
  { path: 'profileUpdate', component: FirmAuthFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
