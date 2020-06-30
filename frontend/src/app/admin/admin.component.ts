import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/services/User/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getUsers().subscribe(data=>{
      this.users = data['users'];
    })
  }

  approveUser(username: string){
    this.userService.approveUser(username).subscribe(data=>{
      console.log(data);
    });
  }

  deleteUser(username: string){
    this.userService.deleteUser(username).subscribe(data=>{
      console.log(data);
    });
  }

  editUser(username: string, type: number){
    if(type == 1) this.router.navigate(['/editEnterprise'], { queryParams: { username: username }});
    if(type == 2) this.router.navigate(['/editFarmer'], { queryParams: { username: username }});
  }

  addNewFarmer(){
    this.router.navigate(['/registrateFarmer']);
  }

  addNewEnterprise(){
    this.router.navigate(['/registrateEnterprise']);
  }


}
