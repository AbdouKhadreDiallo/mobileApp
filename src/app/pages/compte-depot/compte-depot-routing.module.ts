import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompteDepotPage } from './compte-depot.page';

const routes: Routes = [
  {
    path: '',
    component: CompteDepotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompteDepotPageRoutingModule {}
