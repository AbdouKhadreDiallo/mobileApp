import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
  historiques;
  sommeTotal = 0;
  constructor(public shared: SharedService) { }

  ngOnInit() {
    this.shared.get('/depots/users').subscribe(
      data => {
        this.historiques = data;
        console.log(this.historiques);
        this.historiques.forEach(element => {
          this.sommeTotal+=element.montant;
        });
        
      }
    )
  }

}
