import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-agences',
  templateUrl: './agences.page.html',
  styleUrls: ['./agences.page.scss'],
})
export class AgencesPage implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  wrong = false;
  constructor(private _formBuilder: FormBuilder, public shared: SharedService) { 
    
  }

  ngOnInit() {
    const num = /^[0-9]*$/;
    const regemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.firstFormGroup = this._formBuilder.group({
      nomAgence: ['',[Validators.required]],
      adresse: ['',[Validators.required]],
      montant: ['',[
        Validators.required,
        Validators.pattern(num),
        Validators.min(700000)
      ]],
    });
    this.secondFormGroup = this._formBuilder.group({
      adminFirstname: ['', Validators.required],
      adminLastname: ['', Validators.required],
      admincni: ['', [Validators.required, Validators.pattern(num)]],
      adminEmail: ['', 
        [Validators.required,
          Validators.pattern(regemail)]
    ],
    });
    this.thirdFormGroup = this._formBuilder.group({
      userFirstname: ['', Validators.required],
      userLastname: ['', Validators.required],
      usercni: ['', [Validators.required, Validators.pattern(num)]],
      userEmail: ['', [
        Validators.required,
        Validators.pattern(regemail)
      ]
        
      ],
    });
  }
  selectChange(e) {
    console.log(e);
  }
  validation_messages = {
    nom: [
      { type: 'required', message: 'le nom et prenom sont obligatoire.' },
    ],
    agence: [
      { type: 'required', message: 'ce champs obligatoire.' },
    ],
    cin: [
      { type: 'required', message: 'le CIN du repeteur est requis.' },
      { type: 'pattern', message: 'le CIN doit etre numerique.' },
    ],
    montant: [
      { type: 'required', message: 'Le montant est obligatoire' },
      { type: 'min', message: 'Le montant initiale doit être > 700000' },
      { type: 'pattern', message: 'le montant doit etre numerique.' },
    ],
    email: [
      { type: 'required', message: 'ce champs est obligatoire' },
      { type: 'pattern', message: 'un email est du type user@user.fr.' },
    ],
    fullname: [{ type: 'required', message: 'Le fullname est obligatoire' }],
  };

  onSubmit(){
    if (!(this.firstFormGroup.valid) || !(this.secondFormGroup.valid) || !(this.thirdFormGroup.valid)) {
      this.wrong = true;
      this.validation_messages['all'] = [
        {  message: 'formulaire invalid' },
      ];
      console.log(this.validation_messages);
      
      return;
    }

    const agence = {
      solde: parseInt(this.firstFormGroup.value.montant),
      agence : {
        nom: this.firstFormGroup.value.nomAgence,
        adresse: this.firstFormGroup.value.adresse
      },
      adminAgence:[
        {
          email:this.secondFormGroup.value.adminEmail,
          cni: this.secondFormGroup.value.admincni,
          firstname: this.secondFormGroup.value.adminFirstname,
          lastname: this.secondFormGroup.value.adminLastname
        }
      ],
      userAgence: [
        {
          email:this.thirdFormGroup.value.userEmail,
          cni: this.thirdFormGroup.value.usercni,
          firstname: this.thirdFormGroup.value.userFirstname,
          lastname: this.thirdFormGroup.value.userLastname
        }
      ]
    }
    console.log(agence);
    this.shared.post('/agences', agence).subscribe(
      data =>{
        console.log(data);
        
      }, err => {
        console.log(err);
        
      }
    )
    
    
  }

}
