import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompteDepotPageRoutingModule } from './compte-depot-routing.module';

import { CompteDepotPage } from './compte-depot.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompteDepotPageRoutingModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CompteDepotPage]
})
export class CompteDepotPageModule {}
