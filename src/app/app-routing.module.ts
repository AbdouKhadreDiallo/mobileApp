import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    loadChildren: () => import('./pages/accueil/accueil.module').then( m => m.AccueilPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'depot',
    loadChildren: () => import('./pages/depot/depot.module').then( m => m.DepotPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'calculateur',
    loadChildren: () => import('./pages/calculateur/calculateur.module').then( m => m.CalculateurPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'retrait',
    loadChildren: () => import('./pages/retrait/retrait.module').then( m => m.RetraitPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'commissions',
    loadChildren: () => import('./pages/commissions/commissions.module').then( m => m.CommissionsPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'transactions',
    loadChildren: () => import('./pages/transactions/transactions.module').then( m => m.TransactionsPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'agences',
    loadChildren: () => import('./pages/agences/agences.module').then( m => m.AgencesPageModule)
  },
  {
    path: 'list-agences',
    loadChildren: () => import('./pages/list-agences/list-agences.module').then( m => m.ListAgencesPageModule)
  },
  {
    path: 'caissiers',
    loadChildren: () => import('./pages/caissiers/caissiers.module').then( m => m.CaissiersPageModule)
  },
  {
    path: 'liste-caissier',
    loadChildren: () => import('./pages/liste-caissier/liste-caissier.module').then( m => m.ListeCaissierPageModule)
  },
  {
    path: 'compte-depot',
    loadChildren: () => import('./pages/compte-depot/compte-depot.module').then( m => m.CompteDepotPageModule)
  },
  {
    path: 'historique',
    loadChildren: () => import('./pages/historique/historique.module').then( m => m.HistoriquePageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
