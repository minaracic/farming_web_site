import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/services/LogIn/log-in.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { NgForm } from '@angular/forms';

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

  constructor(public logInService: LogInService, private router: Router){}

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
        this.router.navigate(['/admin']);
      }
      if(data['user'].type == 1){
        console.log("enterprise");
      }
      if(data['user'].type == 2){
        console.log("farmer");
      }
    });
  }

}
