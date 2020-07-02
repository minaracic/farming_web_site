import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInService } from 'src/services/LogIn/log-in.service';
import { LogInComponent } from './log-in/log-in.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { RegistrateFarmerComponent } from './registrate-farmer/registrate-farmer.component';
import { RegistrateEnterpriseComponent } from './registrate-enterprise/registrate-enterprise.component';
import { EditEnterpriseComponent } from './edit-enterprise/edit-enterprise.component';
import { EditFarmerComponent } from './edit-farmer/edit-farmer.component';
import { GardensOverviewComponent } from './gardens-overview/gardens-overview.component';
import { GardenDetailsComponent } from './garden-details/garden-details.component';
import { SeedProgressComponent } from './seed-progress/seed-progress.component';
import { StorageComponent } from './storage/storage/storage.component';
import { ShopComponent } from './shop/shop.component';
import { DataTablesModule } from 'angular-datatables';
import { OrdersPreviewComponent } from './orders-preview/orders-preview.component';
import { ArticlComponent } from './articl/articl.component';
import { NewArticlComponent } from './new-articl/new-articl.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LogInComponent,
    RegistrateFarmerComponent,
    RegistrateEnterpriseComponent,
    EditEnterpriseComponent,
    EditFarmerComponent,
    GardensOverviewComponent,
    GardenDetailsComponent,
    SeedProgressComponent,
    StorageComponent,
    ShopComponent,
    OrdersPreviewComponent,
    ArticlComponent,
    NewArticlComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    DataTablesModule
  ],
  providers: [LogInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
