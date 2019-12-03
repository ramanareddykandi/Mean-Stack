import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../services/httpservice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpService:HttpService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  login(f: NgForm) {
    this.cookieService.set('userName', f.value.username);
    this.httpService.login(f.value.username, f.value.password)
  }

}
