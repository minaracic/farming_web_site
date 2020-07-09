import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/User/user.service';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';
import { DOCUMENT } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrate-enterprise',
  templateUrl: './registrate-enterprise.component.html',
  styleUrls: ['./registrate-enterprise.component.css']
})
export class RegistrateEnterpriseComponent implements OnInit {

  companyName:String;
  username:String;
  password1:String;
  password2:String;
  dateOfCreation:Date;
  address:String;
  email:String;

  errorMsg:String;

  constructor(private router: Router,
              public userService: UserService,
              private render2: Renderer2,
              public enterpriseService: EnterpriseService) { }

  ngOnInit(): void {
    this.errorMsg = "";
    const s = this.render2.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js";
    this.render2.appendChild(document.body, s);
  }

  registrate(form: NgForm){
    let reg = new RegExp("([a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]))(?=.{6,})|(([A-Z](?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]))(?=.{6,}))");
    if(this.password1.match(reg) == null){
      this.errorMsg = "Password must contain at least one uppercase, one number and one special character, at least 7 chars long /n";
    }

    if(this.password1 != this.password2){
      this.errorMsg += "Passwords don't match \n";
    }

    if(this.errorMsg == ""){

      let user;

      if(localStorage.getItem('user') != null){
        user = {
          _id: null,
          username: this.username,
          password: this.password1,
          type: 1,
          approvedByAdmin: true
        }
      }
      else{
        user = {
          _id: null,
          username: this.username,
          password: this.password1,
          type: 1,
          approvedByAdmin: false
        }
      }

      this.userService.addNewUser(user).subscribe(data=>{

        let res = data['message'];
        if(res == "Ok"){
          let enterprise = {
            _id: null,
            companyName: this.companyName,
            username: this.username,
            password: this.password1,
            dateOfCreation: this.dateOfCreation,
            address: this.address,
            email: this.email
          }

          this.enterpriseService.addNewEnterprise(enterprise).subscribe(data=>{
            window.alert("New enterprise registred");
          })
        }
        else{
          this.errorMsg += "User with such username already exsists \n";
        }
      });

    }
  }


}
