import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  token;
  isAdmin = false;
  isUserAgence: boolean = false;
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
  }

}
