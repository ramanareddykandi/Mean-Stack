import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpservice.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private httpService: HttpService,private router:Router) { }
  selectedStocks = {};
  ngOnInit() {
    this.getMyprofile();
  }
  sellStock(stock) {
    let data = {id:stock._id,userName:stock.userName}
    this.httpService.sellStocks(data).subscribe(response => {
      this.getMyprofile();
    }, err => {
        console.log(err);
    })
  }

  getMyprofile() {
    this.httpService.getMyProfile().subscribe((response:any) => {
      this.selectedStocks = response.data;
      console.log("myprofile::" + JSON.stringify(response));
      if (response.status === "TOKEN_NOT_AVAILABLE") {
        alert("You are not authorized!");
        this.router.navigate(['/login']);
      }
      })
  }

}
