import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  token;
  isAdmin = false;
  montant;
  created;
  updatedAt;
  show = true;
  isUserAgence: boolean = false;
  isAdminSystem: boolean = false;
  isCaissier: boolean = false;;
  constructor(public loginService: LoginService, public shared: SharedService) { }

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
    if (this.token.roles[0] == "ROLE_CAISSIER") {
      this.isCaissier = true;
    }
    if (this.isAdmin == true || this.isUserAgence == true) {
      
      this.shared.get('/compte/user').subscribe(
        data => {
          this.montant = data['solde'];
          this.created = data['createdAt']
          this.updatedAt= data['updatedAt']
          console.log(data);
          
        }
      )
    }
  }

  deconnexion(){
   return this.loginService.logout();
  }

  disable(){
    this.show = !this.show;
    if (this.show==false) {
      document.getElementById("compteContainer").style.cssText = "-webkit-filter: blur(5px); filter: blur(5px); -moz-filter: blur(5px);-o-filter: blur(5px); -ms-filter: blur(5px);";
    }
    else{
      document.getElementById("compteContainer").style.cssText = "-webkit-filter: none; filter: none; -moz-filter: none;-o-filter: none; -ms-filter: none;";

    }
    console.log(this.show);
  }
}
