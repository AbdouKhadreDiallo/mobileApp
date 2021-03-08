import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient, private loginService: LoginService) { }
  httpOptions = {
		headers: new HttpHeaders({
			'Authorization': 'Bearer ' + this.loginService.getBrutToken(),
		})
	};

  get(suffix){
		return this.http.get(`${this.baseUrl}${suffix}`, this.httpOptions);
  }

  transaction(suffix, data){
    return this.http.post(`${this.baseUrl}${suffix}`,data, this.httpOptions)
  }
  post(suffix, data){
    return this.http.post(`${this.baseUrl}${suffix}`,data, this.httpOptions)
  }
  getByCode(suffix, data){
    return this.http.post(`${this.baseUrl}${suffix}`,data, this.httpOptions)
  }
  block(suffix, id){
    return this.http.delete(`${this.baseUrl}${suffix}/${id}`, this.httpOptions);
  }

}
