import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() data:any;
  modalCtrl: any;
  yes = false;
  dara = {
    type:"success",
    sortie: "hehe"
  }
  wrong: boolean = false;
  validation_messages = {};
  

  constructor(private popCtrl: PopoverController, public shared: SharedService) { }

  ngOnInit() {}


  dismiss() {
    this.popCtrl.dismiss({
      'dismissed': true
    });
  }

  async sendData(){
    this.dismiss();
    this.shared.transaction('/transactions/depot', this.data).subscribe(
      async data => {
        const shown = data[0];
        console.log(shown);
        console.log(data);
        shown.type= "reussi"
        
        let pop = await this.popCtrl.create({
          component: ModalComponent,
          componentProps: {
            data: shown
          }
        });
        await pop.present();
      }, 
      async err => {
        this.wrong = true;
        const shown = {
          type: 'reussi'
        }
        console.log(this.wrong);
        
        let pop = await this.popCtrl.create({
          component: ModalComponent,
          componentProps: {
            data: shown
          }
        });
        this.validation_messages['all'] = [
          {  message: err['error']['message'] },
        ];
      }
    )
      
   
    
  }

  async retrait(){
    this.dismiss();
    const retraitData = {
      codeTransmission: this.data.code,
      receiver : {
        cni: this.data.carte
      }
    };
    this.shared.transaction('/transactions/retrait', retraitData).subscribe(
      async data => {
        console.log(data);
        let shown;
        shown.type= "retrait success"
        
        let pop = await this.popCtrl.create({
          component: ModalComponent,
          componentProps: {
            data: {
              type: 'success'
            }
          }
        });
        await pop.present();
      }
    )

  }

}
