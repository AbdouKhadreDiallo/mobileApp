import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  data: any = {
    type: 'confirmation',
    nom: 'hello',
  };
  depot: FormGroup;
  dataSended: any;
  somme;
  indispo;

  currentModal = null;
  wrong: boolean = false;
  montant: any;
  xasliss: any;
  insdisponible: boolean = false;

  constructor(
    public popoverController: PopoverController,
    private shared: SharedService,
    private builder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    const regexxx = /^7[056789][0-9]{3}([0-9]{2}){2}/gm;
    const num = /^[0-9]*$/;
    this.depot = builder.group({
      senderFullname: ['', [Validators.required]],
      senderCIN: [
        '',
        [Validators.required, Validators.minLength(13),Validators.maxLength(13), Validators.pattern(num)],
      ],
      senderTelephone: ['', [Validators.required, Validators.pattern(regexxx)]],
      receiverFullname: ['', [Validators.required]],
      receiverCIN: [
        '',
        [Validators.required, Validators.minLength(13),Validators.maxLength(13)],
      ],
      receiverTelephone: [
        '',
        [Validators.required, Validators.pattern(regexxx)],
      ],
      montant: ['', [Validators.required, Validators.pattern(num)]],
    });
  }
  validation_messages = {
    senderTelephone: [
      { type: 'required', message: 'le numero de telephone est requis.' },
      { type: 'pattern', message: 'add valid telephone.' },
    ],
    cin: [
      { type: 'required', message: 'le CIN du repeteur est requis.' },
      { type: 'minLength', message: 'le CIN a 9 chiffres.' },
      { type: 'maxLength', message: 'le CIN a 9 chiffres.' },
      { type: 'pattern', message: 'le montant doit etre numerique.' },
    ],
    montant: [
      { type: 'required', message: 'Le montant est obligatoire' },
      { type: 'pattern', message: 'le montant doit etre numerique.' },
    ],
    fullname: [{ type: 'required', message: 'Le fullname est obligatoire' }],
    
  };
 

  ngOnInit() {
    document.getElementById('defaultOpen').click();
    this.shared.get('/compte/user').subscribe(
      data => {
        this.montant = data['solde'];
        
      }
    )
  }
  handleChnage() {
    this.somme = this.depot.value.montant;
    this.insdisponible = false;
    
    if (this.somme > this.montant) {
      this.insdisponible = true
      this.indispo = "montant indisponible"
      

    }
    this.depot.value.frais = this.somme;
    let frais = this.calculTaxe(this.somme);
    let total = parseInt(this.somme) + frais;
    document.getElementById('frais').innerHTML = frais.toString();
    document.getElementById('total').innerHTML = total.toString();
  }
  openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(cityName).style.display = 'block';
    evt.currentTarget.className += ' active';
  }

  async showModal() {
    this.dataSended = {
      type: 'confirmation',
      sender: {
        fullname: this.depot.value.senderFullname,
        cin: this.depot.value.senderCIN,
        telephone: this.depot.value.senderTelephone,
      },
      receiver: {
        fullname: this.depot.value.receiverFullname,
        cin: this.depot.value.receiverCIN,
        telephone: this.depot.value.receiverTelephone,
      },
      montant: parseInt(this.depot.value.montant),
    };
    // return

    let pop = await this.popoverController.create({
      component: ModalComponent,
      componentProps: {
        data: this.dataSended,
      },
    });
    await pop.present();
    this.currentModal = pop;
  }

  async showConfirm(datas) {
    
    const confirm = await this.alertCtrl.create({
      cssClass:'alertController',
      header: 'Confirmation',
      message: `
        <ion-list>
    <ion-item>
      <ion-label>
        <p>Emetteur</p>
        <h2> ${datas.sender.fullname} </h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>Téléphone</p>
        <h2> ${datas.sender.telephone}</h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>N° CNI</p>
        <h2> ${datas.sender.cin} </h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>Montant à envoyer</p>
        <h2> ${datas.montant} </h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>Récepteur</p>
        <h2> ${datas.receiver.fullname} </h2>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <p>Telephone Recepteur/trice</p>
        <h2> ${datas.receiver.telephone} </h2>
      </ion-label>
    </ion-item>
  </ion-list>
      `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Oui',
          handler: () => {
            
            this.shared
              .transaction('/transactions/depot', datas)
              .subscribe(async (data) => {
                
                this.depot.reset();
                const confirmation = await this.alertCtrl.create({
                  header: 'success',
                  message: `
                  <ion-list>
                  <ion-item>
                    <ion-label style="text-align: center;">
                      <p>infos</p>
                      <h2> Vous avez envoyer ${data[0]['montant']} à <br> ${data[0]['receiver']['nomComplet']} <br> le ${data[0]['dateDepot']} </h2>
                    </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label>
                      <p>code de transmission</p>
                      <h2> ${data[0]['codeTransmission']} </h2>
                    </ion-label>
                  </ion-item>
                  
                </ion-list>
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <ion-icon style="margin-left: 30px;color: #fa4a0c;font-size: 25px;"  name="refresh-sharp"></ion-icon>
                    </ion-col>
                    <ion-col>
                      <ion-icon style="margin-left: 30px;color: #fa4a0c;font-size: 25px;" name="mail-open-sharp"></ion-icon>
                    </ion-col>
                  </ion-row>
                </ion-grid>
                  `,
                  buttons: [
                    {
                      text: 'OK',
                      role: 'OK',
                    },
                  ],
                });
                await confirmation.present();
              },
              err => {
                
                this.wrong = true;
                this.validation_messages['all'] = [
                  {  message: err['error']['message'] },
                ];
              }
              
              );
          },
        },
      ],
    });
    await confirm.present();
  }

  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

  depotFunction() {
    if (!this.depot.valid) {
      this.wrong = true;
      this.validation_messages['all'] = [
        {  message: 'formulaire invalid' },
      ];
      return false;
    }

    this.dataSended = {
      sender: {
        fullname: this.depot.value.senderFullname,
        cin: this.depot.value.senderCIN,
        telephone: this.depot.value.senderTelephone,
      },
      receiver: {
        fullname: this.depot.value.receiverFullname,
        cin: this.depot.value.receiverCIN,
        telephone: this.depot.value.receiverTelephone,
      },
      montant: parseInt(this.depot.value.montant),
    };

    this.showConfirm(this.dataSended)
  }

  calculTaxe(montant) {
    let taxe = 0;
    switch (true) {
      case montant < 5000:
        taxe = 425;
        break;
      case montant < 10000:
        taxe = 850;
        break;
      case montant < 15000:
        taxe = 1270;
        break;
      case montant < 20000:
        taxe = 1695;
        break;
      case montant < 50000:
        taxe = 2500;
        break;
      case montant < 60000:
        taxe = 3000;
        break;
      case montant < 75000:
        taxe = 4000;
        break;
      case montant < 120000:
        taxe = 5000;
        break;
      case montant < 150000:
        taxe = 6000;
        break;
      case montant < 200000:
        taxe = 7000;
        break;
      case montant < 250000:
        taxe = 8000;
        break;
      case montant < 300000:
        taxe = 9000;
        break;
      case montant < 400000:
        taxe = 12000;
        break;
      case montant < 750000:
        taxe = 15000;
        break;
      case montant < 900000:
        taxe = 22000;
        break;
      case montant < 1000000:
        taxe = 25000;
        break;

      case montant < 1125000:
        taxe = 27000;
        break;
      case montant < 1400000:
        taxe = 30000;
        break;
      case montant < 2000000:
        taxe = 32000;
        break;
      case montant > 2000000:
        taxe = (2 / 100) * montant;
        break;

      default:
        break;
    }
    return taxe;
  }
}
