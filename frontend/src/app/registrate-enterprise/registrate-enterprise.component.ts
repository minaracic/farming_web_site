import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/User/user.service';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';

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

  constructor(private router: Router, public userService: UserService, public enterpriseService: EnterpriseService) { }

  ngOnInit(): void {
    this.errorMsg = "";
  }

  registrate(form){
    if(this.password1 != this.password2){
      this.errorMsg += "Passwords don't match \n";
    }

    if(this.errorMsg == ""){

      let user = {
        username: this.username,
        password: this.password1,
        type: 1,
        approvedByAdmin: true
      }

      this.userService.addNewUser(user).subscribe(data=>{

        let res = data['message'];
        if(res == "Ok"){
          let enterprise = {
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
