import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/User/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  username: string;
  oldPass: string;
  newPass1: string;
  newPass2: string;
  message: string;

  constructor(public router: Router,
              public userService: UserService) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user'))['username'];
  }

  changePassword(){
    this.message = "";
    if(this.newPass1 != this.newPass2){
      this.message = "New passwords don't match";
      return;
    }

    if(this.newPass1 == this.oldPass){
      this.message = "New passwords must be different than the old one";
      return;
    }

    let reg = new RegExp("([a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]))(?=.{6,})|(([A-Z](?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]))(?=.{6,}))");
    if(this.newPass1.match(reg) == null){
      this.message = "Password must contain at least one uppercase, one number and one special character, at least 7 chars long \n";
      return;
    }

    this.userService.checkPassword(this.username, this.oldPass).subscribe(data=>{
      if(data['msg'] == 'Not ok'){
        this.message = "Old password is incorrect";
        return;
      }

      this.userService.changePassword(this.username, this.oldPass, this.newPass2).subscribe(data=>{
        console.log("changePassword() -> ", data);
        localStorage.clear();
        this.router.navigate(['/logIn']);
      })

    })


  }

}
