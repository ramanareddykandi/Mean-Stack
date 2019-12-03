import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeData } from '../services/dataexchange.service';
import { HttpService } from '../services/httpservice.service';
import {CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-selectedstocks',
  templateUrl: './selectedstocks.component.html',
  styleUrls: ['./selectedstocks.component.css']
})
export class SelectedstocksComponent implements OnInit {

  constructor(private cookieService:CookieService,private dataService: ExchangeData, private router: Router, private httpService: HttpService) {
  }
  selectedStocks = {};

  buyStock(stockInfo) {
    console.log("::event fired" + JSON.stringify(stockInfo));
    stockInfo.userName = this.cookieService.get('userName');
    this.httpService.buyStock(stockInfo).subscribe(response => {
      console.log("Successfully purchased stocks");
      alert("You have succesfully purchased " + stockInfo.title + "stocks");
    })
  }

  ngOnInit() {
    this.selectedStocks = this.dataService.getOption();
    console.log(":::::data:" + JSON.stringify(this.selectedStocks));
  }

}
