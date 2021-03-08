import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-compte-depot',
  templateUrl: './compte-depot.page.html',
  styleUrls: ['./compte-depot.page.scss'],
})
export class CompteDepotPage implements OnInit {
  depot: FormGroup;
  compteNumber;
  comptes;
  wrong: boolean = false;
  constructor(public shared: SharedService, public _fb: FormBuilder,public alertCtrl: AlertController) { 
    const num = /^[0-9]*$/;
    this.depot = this._fb.group({
      numeroCompte : ['', [Validators.required]],
      montant : ['', [Validators.required, Validators.pattern(num)]]
    })
  }
  validation_messages = {
    numeroCompte: [
      { type: 'required', message: 'le numero de compte est obligatoire.' },
    ],
    montant : [
      { type: 'required', message: "le montant est obligatoire" },
      { type: 'pattern', message: 'le montant est numerique' },
    ]
  };


  ngOnInit() {
  }

  handleChange(){
    this.compteNumber = this.depot.value.numeroCompte;
    console.log(this.compteNumber );
    this.shared.getByCode('/compte/numero', {'numeroCompte':this.compteNumber}).subscribe(
      data => {
        console.log(data);
        this.comptes = data;
      }
    )
    
  }
  async showConfirm(data) {  
    const confirm = await this.alertCtrl.create({  
      header: 'Confirmation',  
      message: `
        <ion-title> Confirmation </ion-title>
        <ion-list>
          <ion-item>
            <ion-label>
              <p>Bénéficiaire</p>
              <h2> ${data.compte} </h2>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <p>Bénéficiaire</p>
              <h2> ${data.montant} </h2>
            </ion-label>
          </ion-item>
        </ion-list>
      `,  
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
            this.shared.post('/depots', data).subscribe(
              async data => {
                this.depot.reset();
                const confirmation = await this.alertCtrl.create({
                  header: 'success',
                  message: 'depot effectué avec succees',
                  buttons:[
                    {
                      text: "OK",
                      role: "OK"
                    }
                  ]
                });
                await confirmation.present();
                
              }
            )
            
          }  
        }  
      ]  
    });  
    await confirm.present();  
  }  

  onSubmit(){
    if (!this.depot.valid) {
      this.wrong = true;
      this.validation_messages['all'] = [
        {  message: 'formulaire invalid' },
      ];
      return false;
    }
    

    const depot = {
      montant: parseInt(this.depot.value.montant),
      compte: this.depot.value.numeroCompte
    }
    this.showConfirm(depot)
    
  }

}
