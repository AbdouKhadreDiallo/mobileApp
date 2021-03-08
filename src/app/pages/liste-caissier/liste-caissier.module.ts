import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeCaissierPageRoutingModule } from './liste-caissier-routing.module';

import { ListeCaissierPage } from './liste-caissier.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeCaissierPageRoutingModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [ListeCaissierPage]
})
export class ListeCaissierPageModule {}
