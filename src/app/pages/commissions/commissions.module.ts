import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommissionsPageRoutingModule } from './commissions-routing.module';

import { CommissionsPage } from './commissions.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommissionsPageRoutingModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [CommissionsPage]
})
export class CommissionsPageModule {}
