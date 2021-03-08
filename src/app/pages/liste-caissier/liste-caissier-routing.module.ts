import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeCaissierPage } from './liste-caissier.page';

const routes: Routes = [
  {
    path: '',
    component: ListeCaissierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeCaissierPageRoutingModule {}
