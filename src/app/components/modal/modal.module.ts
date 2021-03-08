import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal.component';
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        IonicModule,
        
      ],
declarations: [
  ModalComponent,
],
exports: [
  ModalComponent,
]
})
export class ModalModule { }