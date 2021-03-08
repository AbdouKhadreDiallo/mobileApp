import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccueilPageRoutingModule } from './accueil-routing.module';

import { AccueilPage } from './accueil.page';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccueilPageRoutingModule,
    FooterModule,
    RouterModule
    
  ],
  declarations: [AccueilPage]
})
export class AccueilPageModule {}
