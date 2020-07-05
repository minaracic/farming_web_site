import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/services/User/user.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { FarmerService } from 'src/services/Farmer/farmer.service';

@Component({
  selector: 'app-registrate-farmer',
  templateUrl: './registrate-farmer.component.html',
  styleUrls: ['./registrate-farmer.component.css']
})
export class RegistrateFarmerComponent implements OnInit {

  name:String;
  surname:String;
  username:String;
  password1:String;
  password2:String;
  dateOfBirth:Date;
  placeOfBirth:String;
  phone:String;
  email:String;

  errorMsg:String;

  constructor(private router: Router,
              public userService: UserService,
              private render2: Renderer2,
              public farmerService: FarmerService) { }

  ngOnInit(): void {
    this.errorMsg = "";
    const s = this.render2.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js";
    this.render2.appendChild(document.body, s);
  }

  addNewUser(){
    let user;

    if(localStorage.getItem('user') != null){
      user = {
        _id: null,
        username: this.username,
        password: this.password1,
        type: 2,
        approvedByAdmin: true
      }
    }
    else{
      user = {
        _id: null,
        username: this.username,
        password: this.password1,
        type: 2,
        approvedByAdmin: false
      }
    }
    return this.userService.addNewUser(user);
  }

  addNewFarmer(){
    let user = {
      username: this.username,
      password: this.password1,
      name: this.name,
      surname: this.surname,
      dateOfBirth: this.dateOfBirth,
      placeOfBirth: this.placeOfBirth,
      phone: this.phone,
      email: this.email
    }

    this.farmerService.addNewFarmer(user).subscribe(data=>{
      console.log(data);
    })
  }

  registrate(registrateForm: NgForm){
    // let reg = new RegExp("([a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]))(?=.{6,})|(([A-Z](?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]))(?=.{6,}))");
    // if(this.password1.match(reg) == null){
    //   this.errorMsg = "Password must contain at least one uppercase, one number and one special character, at least 7 chars long /n";
    // }
    if(this.password1 != this.password2){
      this.errorMsg += "Passwords don't match \n";
    }

    if(this.errorMsg == ""){

      this.addNewUser().subscribe(data=>{
        console.log("addNewUser ->", data);

        let res = data['message'];
        if(res == "Ok"){
          this.addNewFarmer();
          window.alert("New farmer registred");
        }
        else{
          this.errorMsg += "User with such username already exsists \n";
        }
      });

    }

  }

}
