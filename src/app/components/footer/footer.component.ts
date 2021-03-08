import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  token;
  isAdmin = false;
  isUserAgence = false;
  isAdminSystem: boolean=false;
  isCaissier: boolean = false;
  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.token = this.loginService.decodeToken();
    console.log(this.token);
    if (this.token.roles[0] == "ROLE_ADMIN_AGENCE") {
      this.isAdmin = true;
    }
    if (this.token.roles[0] == "ROLE_USER_AGENCE") {
      this.isUserAgence = true;
    }
    if (this.token.roles[0] == "ROLE_ADMIN_SYSTEM") {
      this.isAdminSystem = true;
    }
    if (this.token.roles[0] == "CAISSIER") {
      this.isCaissier = true;
    }
  }
  

}
