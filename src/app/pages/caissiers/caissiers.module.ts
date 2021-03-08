import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaissiersPageRoutingModule } from './caissiers-routing.module';

import { CaissiersPage } from './caissiers.page';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaissiersPageRoutingModule,
    FooterModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CaissiersPage]
})
export class CaissiersPageModule {}
