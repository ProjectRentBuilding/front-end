import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {ContractsComponent} from './component/contract/contracts/contracts.component';
import {ContractListComponent} from './component/contract/contract-list/contract-list.component';
import {ContractEditComponent} from './component/contract/contract-edit/contract-edit.component';
import {ContractAddComponent} from './component/contract/contract-add/contract-add.component';
import {ContractDetailComponent} from './component/contract/contract-detail/contract-detail.component';
import {ListBuildingComponent} from './component/building/list-building/list-building.component';
import {CustomerListComponent} from './component/customer/customer-list/customer-list.component';
import {CustomersComponent} from './component/customer/customers/customers.component';
import {EquipmentListComponent} from './component/equipment/equipment-list/equipment-list.component';


const routes: Routes = [
  {path: 'equipment-list', component: EquipmentListComponent},
  {
    path: 'buildings',
    component: ListBuildingComponent,
  },
  {path: '', component: HomeComponent},
  {
    path: 'contracts',
    component: ContractsComponent,
    children: [
      {
        path: '',
        component: ContractListComponent
      },
      {
        path: ':id/edit',
        component: ContractEditComponent
      },
      {
        path: 'add',
        component: ContractAddComponent
      },
      {
        path: ':id/detail',
        component: ContractDetailComponent
      }
    ]
  },
  {
    path: 'customers',
    component: CustomersComponent,
    children: [
      {
        path: '',
        component: CustomerListComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
