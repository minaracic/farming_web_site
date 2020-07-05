import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Farmer } from 'src/models/farmer';
import { Router } from '@angular/router';
import { FarmerService } from 'src/services/Farmer/farmer.service';

@Component({
  selector: 'app-edit-farmer',
  templateUrl: './edit-farmer.component.html',
  styleUrls: ['./edit-farmer.component.css']
})
export class EditFarmerComponent implements OnInit {

  id: String;
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

  constructor(private router: Router, public farmerService: FarmerService) { }

  ngOnInit(): void {
    this.username = this.router.parseUrl(this.router.url).queryParams['username'];

    this.farmerService.getByUsername(this.username).subscribe(data=>{
      let user: Farmer = data['user'];
      this.id = user._id;
      this.name = user.name;
      this.username = user.username;
      this.surname = user.surname;
      this.dateOfBirth = user.dateOfBirth;
      this.placeOfBirth = user.placeOfBirth;
      this.phone = user.phone;
      this.email = user.email;
    });
  }

  saveChanges(editForm: NgForm){
    let toUpdate: Farmer = {
      _id:this.id,
      username: this.username,
      password: this.password1,
      name: this.name,
      surname: this.surname,
      dateOfBirth: this.dateOfBirth,
      placeOfBirth: this.placeOfBirth,
      phone: this.phone,
      email: this.email
    };

    this.farmerService.updateFarmer(this.username, toUpdate).subscribe(data=>{
      if(data['message'] == "Ok"){
        window.alert("Farmer's changes saved");
      }
      else{
        window.alert("Farmer's changes not saved");
      }
    });
  }


}
