import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'logIn', component: LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
