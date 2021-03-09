import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  retrait: FormGroup;
  codeTransmission:null;
  transaction : any;
  data: any = {
    type:"retrait",
    beneficiere:"Diallo Mariama",
    telephone:"773452312",
    cni:12345678,
    montant:350000,
    emetteur: "Diallo Saliou",
    emetTelephone: 776543423
  };
  currentModal: HTMLIonPopoverElement;
  wrong: boolean;

  constructor(public popoverController: PopoverController, private shared: SharedService, public fb:FormBuilder,public alertCtrl: AlertController) {
    const num = /^[0-9]*$/;
    this.retrait = this.fb.group({
      code: ['', [Validators.required]],
      cni:  [
        '',
        [Validators.required, Validators.minLength(13), Validators.pattern(num)],
      ]
    })  
    
    
  }
  validation_messages = {
    code: [
      { type: 'required', message: 'Le code est obligatoire' },
    ],
    cni: [
      { type: 'required', message: 'Le cni est obligatoire' },
      { type: 'pattern', message: 'le cni doit etre numerique.' },
      { type: 'minLength', message: 'le cni a 13 chiffres.' },
    ]
  };
  ngOnInit() {
    document.getElementById("defaultOpen").click();
  }
  openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  handleChange(){
    this.codeTransmission = this.retrait.value.code;
    console.log(this.codeTransmission );
    this.shared.getByCode('/transactions/code', {'codeTransmission':this.codeTransmission}).subscribe(
      data => {
        console.log(data);
        this.transaction = data[0];
      }
    )
    
  }
  async showModal(){
    this.transaction.type="retrait";
    this.transaction.code = this.retrait.value.code;
    this.transaction.carte = this.retrait.value.cni;
    let pop = await this.popoverController.create({
      
      component: ModalComponent,
      componentProps: {
        data: this.transaction
      }
    });
    await pop.present();
     this.currentModal = pop;
 
}
async showConfirm(data, retrait) {  
  const confirm = await this.alertCtrl.create({  
    header: 'Confirmation',  
    message: `
      <ion-title> Confirmation </ion-title>
      <ion-list>
    <ion-item>
      <ion-label>
        <p>Bénéficiaire</p>
        <h2> ${data.receiver.nomComplet} </h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>Téléphone</p>
        <h2> ${data.receiver.telephone}</h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>N° CNI</p>
        <h2> ${data.carte}</h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>Montant à envoyer</p>
        <h2> ${data.montant} </h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>Emetteur</p>
        <h2> ${data.sender.nomComplet} </h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>Telephone</p>
        <h2> ${data.sender.telephone} </h2>
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
        text: 'Oui',  
        handler: () => {
          this.shared.transaction('/transactions/retrait', retrait).subscribe(
            async data => {
              this.retrait.reset();
              const confirmation = await this.alertCtrl.create({
                header: 'success',
                message: 'retrait effectué avec succees',
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
async onSubmit(){
  if (!this.retrait.valid) {
    this.wrong = true;
    this.validation_messages['all'] = [
      {  message: 'formulaire invalid' },
    ];
    return false;
  }

    this.transaction.code = this.retrait.value.code;
    this.transaction.carte = this.retrait.value.cni;

    const retraitData = {
      codeTransmission: this.transaction.code,
      receiver : {
        cni: this.transaction.carte
      }
    }
    this.showConfirm(this.transaction, retraitData);
}


 dismissModal() {
  if (this.currentModal) {
    this.currentModal.dismiss().then(() => { this.currentModal = null; });
  }
}

}
