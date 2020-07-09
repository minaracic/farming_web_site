import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/services/LogIn/log-in.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { NgForm } from '@angular/forms';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';
import { FarmerService } from 'src/services/Farmer/farmer.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  password: string;
  username: string;
  message: string;
  user: User;

  ngOnInit(): void {
  }

  constructor(public logInService: LogInService,
              private enterpriseService: EnterpriseService,
              public router: Router,
              private farmerService: FarmerService){}

  logInUser(form: NgForm){
    this.logInService.logIn(this.username, this.password).subscribe((data)=>{
      let message = data['message'];
      let user = data['user'];

      if(message == "No user"){
        this.message = "No such user!";
      }
      if(message == "Ok"){
        this.user = user;
        this.routeToPage();
      }
      if(message == "Wrong password"){
       this.message = "Invalid password, try again!"
      }
      if(message == "User not approved"){
        this.message = "User not yet approved";
      }

    });
  }

  routeToPage(){
    this.logInService.getUser(this.user).subscribe(data=>{
      if(data['user'].type == 0){
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/admin']);
      }
      if(data['user'].type == 1){
        this.enterpriseService.getByUsername(data['user'].username).subscribe(data=>{
          localStorage.setItem('user', JSON.stringify(data['user']));
          document.getElementById("note").style.visibility = "visible";
          this.router.navigate(['/ordersPreview']);
        });
      }
      if(data['user'].type == 2){
        this.farmerService.getByUsername(data['user'].username).subscribe(data=>{
          localStorage.setItem('user', JSON.stringify(data['user']));
          this.router.navigate(['/gardensOverview']);
        })        // .getByUsername(data['user'].username).subscribe(data=>{
        //   localStorage.setItem('user', JSON.stringify(data['user']));
        //   this.router.navigate(['/ordersOverview']);
        // });
      }
    });
  }

  registerAsFarmer(){
    this.router.navigate(['/registrateFarmer']);
  }

  registerAsEnterprise(){
    this.router.navigate(['/registrateEnterprise']);
  }
}
