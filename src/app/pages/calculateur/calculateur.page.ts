import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-calculateur',
  templateUrl: './calculateur.page.html',
  styleUrls: ['./calculateur.page.scss'],
})
export class CalculateurPage implements OnInit {
  currentModal: HTMLIonPopoverElement;
  data = {
    type: 'calculateur',
    montant: 300000,
    frais: 12000,
  };
  calcul: FormGroup;
  chiffres:any;
  constructor(public popoverController: PopoverController, public fb: FormBuilder) {
    const num = /^[0-9]*$/;
    this.calcul = this.fb.group({
      montant: ['', [Validators.required, Validators.pattern(num)]],
    })
  }
  validation_messages = {
    montant: [
      { type: 'required', message: 'Le montant est obligatoire' },
      { type: 'pattern', message: 'le montant doit etre numerique.' },
    ]
  };

  ngOnInit() {}
  async showModal() {
    this.chiffres = {
      type: "calculateur",
      montant: parseInt(this.calcul.value.montant),
      frais: this.calculTaxe(parseInt(this.calcul.value.montant))
    }
    let pop = await this.popoverController.create({
      component: ModalComponent,
      componentProps: {
        data: this.chiffres,
      },
    });
    await pop.present();
    this.currentModal = pop;
  }

  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

  calculTaxe(montant) {
    let taxe = 0;
    switch (true) {
      case montant <= 5000:
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
