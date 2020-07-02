import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrateFarmerComponent } from './registrate-farmer/registrate-farmer.component';
import { RegistrateEnterpriseComponent } from './registrate-enterprise/registrate-enterprise.component';
import { EditEnterpriseComponent } from './edit-enterprise/edit-enterprise.component';
import { EditFarmerComponent } from './edit-farmer/edit-farmer.component';
import { GardensOverviewComponent } from './gardens-overview/gardens-overview.component';
import { GardenDetailsComponent } from './garden-details/garden-details.component';
import { SeedProgressComponent } from './seed-progress/seed-progress.component';
import { StorageComponent } from './storage/storage/storage.component';
import { ShopComponent } from './shop/shop.component';
import { OrderService } from 'src/services/order/order.service';
import { OrdersPreviewComponent } from './orders-preview/orders-preview.component';


const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'registrateFarmer', component: RegistrateFarmerComponent},
  {path: 'registrateEnterprise', component: RegistrateEnterpriseComponent},
  {path: 'editEnterprise', component: EditEnterpriseComponent},
  {path: 'editFarmer', component: EditFarmerComponent},
  {path: 'gardensOverview', component: GardensOverviewComponent},
  {path: 'gardenDetails', component: GardenDetailsComponent},
  {path: 'seedProgress', component: SeedProgressComponent},
  {path: 'storage', component: StorageComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'ordersPreview', component: OrdersPreviewComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
