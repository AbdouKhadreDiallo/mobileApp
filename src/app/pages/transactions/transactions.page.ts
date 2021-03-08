import { decimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  page_number = 1;
  total = 0;
  page_limit = 8;
  trans = [];
  itemListData = [];
  tab = [];
  transactions:any;
  numTimesLeft = 1; 
  counter = 0; 
  token;
  isAdmin = false;
  tabTransact= [];
  allTransaction: any;
  
  constructor(public shared: SharedService, public loginService:LoginService) { 
    
  }
  ngOnInit() {
    this.token = this.loginService.decodeToken();
    console.log(this.token);
    if (this.token.roles[0] == "ROLE_ADMIN_AGENCE") {
      this.isAdmin = true;
    }
    if (!this.isAdmin) {
      
      this.getTransaction(false, "");
      this.shared.get('/user/transactions').subscribe(
        data => {
          this.transactions = data
          for (const iterator of this.transactions) {
            this.trans.push(iterator)
          }
          for (const iterator of this.trans) {
            for (let index = 0; index < iterator.length; index++) {
              const element = iterator[index];
              this.tab.push(element);
            }
          }
          this.tab.forEach(element => {
            this.total+= element.montant;
          });
          console.log(this.total);
          
        }
      )
    }
    if (this.isAdmin) {
      this.shared.get('/trans').subscribe(
        data => {
          this.allTransaction = data;
          for (const key in this.allTransaction) {
            if (Object.prototype.hasOwnProperty.call(this.allTransaction, key)) {
              const element = this.allTransaction[key];
              this.tabTransact.push(element);
              this.tabTransact.forEach(element => {
                element.forEach(element => {
                  this.total+=element.montant;
                });
                
              });
            }
          }
          console.log(this.tabTransact);
          
          
        }
      )
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getTransaction(isFirstLoad, event){
    for (let i = 0; i < this.tab.length; i++) {
      this.itemListData.push(this.tab[i]);
    }
    if (isFirstLoad)
      event.target.complete();
    this.page_number++;
  }
  doInfinite(event) {
    this.getTransaction(true, event);
  }

}
