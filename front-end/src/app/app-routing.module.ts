import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'stock', loadChildren: () => import('./modules/stock-management/stock-management.module').then(m => m.StockManagementModule), canActivate: [authGuard] },
  { path: 'transactions', loadChildren: () => import('./modules/transactions/transactions.module').then(m => m.TransactionsModule), canActivate: [authGuard] },
  { path: 'firm-auth', loadChildren: () => import('./modules/firm-auth/firm-auth.module').then(m => m.FirmAuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
