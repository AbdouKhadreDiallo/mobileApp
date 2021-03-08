import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-caissiers',
  templateUrl: './caissiers.page.html',
  styleUrls: ['./caissiers.page.scss'],
})
export class CaissiersPage implements OnInit {
  create: FormGroup;
  wrong: boolean = false;
  constructor(public shared: SharedService, public _fb: FormBuilder, private router: Router) { 
    const regemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const num = /^[0-9]*$/;
    const regexxx = /^7[056789][0-9]{3}([0-9]{2}){2}/gm;

    this.create = this._fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern(regemail)
      ]],
      telephone: ['', [
        Validators.required,
        Validators.pattern(regexxx)
      ]],
      cin : ['', [
        Validators.required,
        Validators.pattern(num),
        Validators.minLength(13),
        Validators.maxLength(13)
      ]],
    })
  }

  validation_messages = {
    telephone: [
      { type: 'required', message: 'le numero de telephone est requis.' },
      { type: 'pattern', message: 'add valid telephone.' },
    ],
    email : [
      { type: 'required', message: "l'email est requis" },
      { type: 'pattern', message: 'un email est du type user@user.fr.' },
    ],
    cin: [
      { type: 'required', message: 'le CIN du repeteur est requis.' },
      { type: 'minLength', message: 'le CIN a 13 chiffres.' },
      { type: 'maxLength', message: 'le CIN a 13 chiffres.' },
      { type: 'pattern', message: 'le montant doit etre numerique.' },
    ],
    fullname: [{ type: 'required', message: 'Le fullname est obligatoire' }],
  };

  ngOnInit() {
  }

  onSubmit(){

    if (!this.create.valid) {
      this.wrong = true;
      this.validation_messages['all'] = [
        {  message: 'formulaire invalid' },
      ];
      return false;
    }

    const caissier = {
      email: this.create.value.email,
      firstname: this.create.value.firstname,
      lastname: this.create.value.lastname,
      CIN: this.create.value.cin,
      telephone: this.create.value.telephone
    }

    this.shared.post('/caissiers', caissier).subscribe(
      data => {
        this.router.navigate(['liste-caissier'])
      },
      err => {
        console.log(err);
      }
    )

    console.log(caissier);
    
  }
}
