import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculateurPageRoutingModule } from './calculateur-routing.module';

import { CalculateurPage } from './calculateur.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculateurPageRoutingModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CalculateurPage]
})
export class CalculateurPageModule {}
