import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-liste-caissier',
  templateUrl: './liste-caissier.page.html',
  styleUrls: ['./liste-caissier.page.scss'],
})
export class ListeCaissierPage implements OnInit {
  caissiers;
  constructor(public shared: SharedService,public alertCtrl: AlertController) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.shared.get('/caissiers').subscribe(
      data => {
        this.caissiers = data['hydra:member'];
        console.log(this.caissiers);
        
      }
    )
  }
  block(id){
    this.shared.block('/caissiers', id).subscribe(
      response => {
        console.log(response);
      }
    )
  }
  deBlock(id){
    this.shared.block('/caissiers', id).subscribe(
      response => {
        console.log(response);
        this.getAll()
      }
    )
  }
  async showConfirm(id) {  
    const confirm = await this.alertCtrl.create({  
      header: 'Confirmation',  
      message: 'Voulez vraiment bloquer cette agence ?',  
      buttons: [  
        {  
          text: 'Cancel',  
          role: 'cancel',  
          handler: () => {  
            console.log('Confirm Cancel');  
          }  
        },  
        {  
          text: 'Okay',  
          handler: () => {  
              this.block(id);
              this.getAll()
          }  
        }  
      ]  
    });  
    await confirm.present();  
  }  

}
