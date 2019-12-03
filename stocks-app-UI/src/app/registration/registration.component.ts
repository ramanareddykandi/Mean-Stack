import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username = new FormControl(null, []);
  mobile = new FormControl(null, []);
  password = new FormControl(null, []);

  registerForm: FormGroup;

  constructor(private httpService:HttpService, private fb: FormBuilder,private router:Router) {
    this.registerForm = this.fb.group({
      username: this.username,
      password: this.password,
      mobile: this.mobile
    });
    console.log('Form Data::' + this.registerForm);
  }
  onRegister() {
    let userInfo = {userName:this.registerForm.value.username,mobile:this.registerForm.value.mobile,password:this.registerForm.value.password}
    this.httpService.registerUser(userInfo);
    console.log(this.registerForm.value.username);
    this.router.navigate(['\login'])
   }
  ngOnInit() {
  }
  

}
