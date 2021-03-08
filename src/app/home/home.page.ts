import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup;
	token: any;
  blocked;

  constructor(private loginService: LoginService, builder: FormBuilder) {
    this.loginForm = builder.group(
			{
				username: ['', [Validators.required]],
				password: ['', [Validators.required]]
			}
		);
  }
  

  onSubmit(){
    
    console.log(this.loginForm.value.password);
    console.log(this.loginService.getToken(this.loginForm.value.username, this.loginForm.value.password));
    console.log(this.loginService.message);
    this.token = this.loginService.decodeToken();
    //console.log(this.token);
    this.loginService.redirectByRole(this.token.roles[0]);
    
    
    
  }

}
