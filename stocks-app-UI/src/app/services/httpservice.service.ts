
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })

export class HttpService{

    constructor(private router:Router,private httpClient: HttpClient, private cookieService: CookieService) {
    }
     
    getMyProfile() {
        let userName = this.cookieService.get('userName')
        let headers = this.getHeader(localStorage.getItem('token'));
        return this.httpClient.get('http://localhost:9898/api/v1/user/stocks/?userName='+userName,headers)
    }

    registerUser(data) {
        this.httpClient.post('http://localhost:9898/api/v1/register/user', data).subscribe(
            result => {
                console.log('Registered data::' + JSON.stringify(result));
                alert('You have registered Successfully');
                this.router.navigate(['/login']);
            },
            err => {
                console.log(err);
            });
    }
    getDashBoardData() {
        this.verifyToken();
        let headers = this.getHeader(localStorage.getItem('token'));
        return this.httpClient.get('http://localhost:9898/api/v1/dashboard', headers);
    }
    buyStock(data) {
        let headers = this.getHeader(localStorage.getItem('token'));
        return this.httpClient.post('http://localhost:9898/api/v1/buystock', data,headers);
    }
    sellStocks(data) {
        let headers = this.getHeader(localStorage.getItem('token'));
        return this.httpClient.post('http://localhost:9898/api/v1/sellstock', data,headers);
    }
    login(userName, password) {
        let data = { "userName": userName, "password": password };
        return this.httpClient.post('http://localhost:9898/api/v1/login', data).subscribe((response: any) => {
            this.cookieService.set('token', response.Token);
            localStorage.setItem('token',response.Token);
            alert("You have successfuly LoggedIn! We will redirect you to dashboard plz");
            this.router.navigate(['/dashboard']);
          })
    }
    logOut() {
        return this.httpClient.get('http://localhost:9898/api/v1/logout').subscribe((response: any) => {
            this.cookieService.delete('token');
            this.cookieService.delete('userName');
            localStorage.removeItem('token');
            alert("You have successfully Logged out");
            this.router.navigate(['/login']);
        })
    }

    getHeader(token) {
        if (token === undefined || token=== null) {
            return {};
        }
        if (token === '') {
            return {};
        }
       return { headers: { 'authorization': "bearer " + token } };
    }
    verifyToken() {
        let token = localStorage.getItem('token')
        if (token === undefined || token === null) {
            alert('You are unauthorized plz login');
            this.router.navigate(['/login']);
        }
    }
}