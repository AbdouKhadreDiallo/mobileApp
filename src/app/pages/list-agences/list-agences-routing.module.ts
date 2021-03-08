import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAgencesPage } from './list-agences.page';

const routes: Routes = [
  {
    path: '',
    component: ListAgencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAgencesPageRoutingModule {}
