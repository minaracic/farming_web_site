import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/User/user.service';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';
import { NgForm } from '@angular/forms';
import { Enterprise } from 'src/models/enterprise';

@Component({
  selector: 'app-edit-enterprise',
  templateUrl: './edit-enterprise.component.html',
  styleUrls: ['./edit-enterprise.component.css']
})
export class EditEnterpriseComponent implements OnInit {
  companyName:String;
  username:String;
  password1:String;
  dateOfCreation:Date;
  address:String;
  availablePostman: Number;
  email:String;
  id: String;

  errorMsg:String;

  constructor(private router: Router, public enterpriseService: EnterpriseService) { }

  ngOnInit(): void {
    this.username = this.router.parseUrl(this.router.url).queryParams['username'];
    this.enterpriseService.getByUsername(this.username).subscribe(data=>{
      let user: Enterprise = data['user'];
      this.id = user._id;
      this.companyName = user.companyName;
      this.address = user.address;
      this.password1 = user.password;
      this.username = user.username;
      this.email = user.email;
      this.availablePostman = user.availablePostman;
    });

  }

  saveChanges(editForm: NgForm){
    let toUpdate: Enterprise = {
      _id: this.id,
      username: this.username,
      password: this.password1,
      companyName: this.companyName,
      dateOfCreation: this.dateOfCreation,
      address: this.address,
      email: this.email,
      availablePostman: this.availablePostman

    };
    console.log("saveChanges");
    this.enterpriseService.updateEnterprise(this.username, toUpdate).subscribe(data=>{
      if(data['message'] == "Ok"){
        window.alert("Enterprise edited");
      }
      else{
        window.alert("Enterprise not edited");
      }
    });
  }

}
