import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public baseUrl = 'http://127.0.0.1:8000/api';
  public localStorage = window.localStorage;
  isAdminAgence = false;
  public message = "invalid";
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    const credentials = {
      username: username,
      password: password,
    };
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  public getToken(username: string, password: string) {
    this.login(username, password).subscribe(
      (token: { token: string }) => {
        localStorage.setItem('token', token.token);
      },
      (httpError: { error: { message: any } }) =>
      {

        console.log(httpError.error.message)
        this.message = httpError.error.message
      }
        
    );
  }
  
  getBrutToken() {
    return this.localStorage.getItem('token');
  }

  decodeToken() {
    return this.localStorage.getItem('token')
      ? jwt_decode(this.localStorage.getItem('token') || '{}')
      : null;
  }

  isToken(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  // function for auth guard
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    //this.islog.next(false);
    return authToken !== null ? true : false;
  }

  logout() {
    if (confirm('Voulez-vous vous deconnectez ?')) {
      let removeToken = localStorage.removeItem('token');
      if (removeToken == null) {
        this.router.navigate(['login']);
      }
    }
  }
  

  redirectByRole(role: string) {

	//console.log(role);

	switch (role) {
		case 'ROLE_ADMIN_SYSTEM': {
			//localStorage.clear() ;
			this.router.navigate(['accueil']);
			break;
		}
    case 'ROLE_ADMIN_AGENCE': {
			//localStorage.clear() ;
			this.router.navigate(['accueil']);
			break;
		}
		case 'ROLE_USER_AGENCE': {
			this.router.navigate(['accueil']);
			break;
		}
    case 'ROLE_CAISSIER': {
			this.router.navigate(['accueil']);
			break;
		}
		
		default: {
			this.router.navigate(['']);
			break;
		}
	}
}

}
