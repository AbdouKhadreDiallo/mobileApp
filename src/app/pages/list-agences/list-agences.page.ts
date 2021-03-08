import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-list-agences',
  templateUrl: './list-agences.page.html',
  styleUrls: ['./list-agences.page.scss'],
})
export class ListAgencesPage implements OnInit {
  agences: any;
  constructor(public shared: SharedService,public alertCtrl: AlertController) { }

  ngOnInit() {
    this.refresh()
  }
  refresh(){
    this.shared.get('/agences').subscribe(
      data => {
        this.agences = data["hydra:member"]
        console.log(this.agences);
        
        //console.log(data["hydra:member"]);
      }
    )
  }
  block(id){
    this.shared.block('/agences', id).subscribe(
      response => {
        console.log(response);
      }
    )
  }
  deBlock(id){
    this.shared.block('/agences', id).subscribe(
      response => {
        console.log(response);
        this.refresh()
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
              this.refresh()
          }  
        }  
      ]  
    });  
    await confirm.present();  
  }  

}
