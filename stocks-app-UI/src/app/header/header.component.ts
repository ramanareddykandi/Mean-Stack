import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {HttpService} from '../services/httpservice.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookieService: CookieService,private router:Router,private httpService:HttpService) { }

  ngOnInit() {
  }
  logout() {
    this.httpService.logOut();

  }

}
