import { Component } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";
import { LogInService } from 'src/services/LogIn/log-in.service';
import { User } from 'src/models/user';
import { LogInRes } from 'src/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="Farming"
}
