import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.page.html',
  styleUrls: ['./commissions.page.scss'],
})
export class CommissionsPage implements OnInit {
  allTransaction: Object;
  tabTransact = [];
  total = 0;
  sommeTotal = 0;

  constructor(public shared: SharedService) { }

  ngOnInit() {
    this.shared.get('/trans').subscribe(
      data => {
        //console.log(data);
        
        this.allTransaction = data;
        data['depot'].forEach(element => {
          this.sommeTotal+= element.fraisDepot;
        });
        
        data['retrait'].forEach(element => {
          this.sommeTotal+= element.fraisRetrait;
        });
        data['all'].forEach(element => {
          this.sommeTotal+= element.fraisRetrait + element.fraisDepot;
        });
        // console.log(this.sommeTotal);
        
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
        //console.log(this.tabTransact);
        
        
      }
    )
  }

}
