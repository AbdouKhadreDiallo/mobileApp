import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAgencesPageRoutingModule } from './list-agences-routing.module';

import { ListAgencesPage } from './list-agences.page';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAgencesPageRoutingModule,
    FooterModule,
    HeaderModule, 
    HeaderModule,
    FooterModule
  ],
  declarations: [ListAgencesPage]
})
export class ListAgencesPageModule {}
