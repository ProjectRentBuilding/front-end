import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {ContractsComponent} from './component/contract/contracts/contracts.component';
import {ContractListComponent} from './component/contract/contract-list/contract-list.component';
import {ContractEditComponent} from './component/contract/contract-edit/contract-edit.component';
import {ContractAddComponent} from './component/contract/contract-add/contract-add.component';
import {ContractDetailComponent} from './component/contract/contract-detail/contract-detail.component';
import {BuildingListComponent} from './component/building/building-list/building-list.component';
import {FloorListComponent} from './component/floor/floor-list/floor-list.component';
import {CustomerListComponent} from './component/customer/customer-list/customer-list.component';
import {CustomersComponent} from './component/customer/customers/customers.component';
import {EquipmentListComponent} from './component/equipment/equipment-list/equipment-list.component';
import {GroundListComponent} from './component/ground/ground-list/ground-list.component';
import {EquipmentBuildingComponent} from './component/equipment/equipment-building/equipment-building.component';
import {EmployeesComponent} from './component/employee/employees/employees.component';
import {EmployeeListComponent} from './component/employee/employee-list/employee-list.component';
import {ServicesListComponent} from './component/services/services-list/services-list.component';
import {ReportsComponent} from './component/report/reports/reports.component';
import {ReportListComponent} from './component/report/report-list/report-list.component';


import {ServicesDetailComponent} from "./component/services/services-detail/services-detail.component";
import {ReportEmployeeComponent} from './component/report/report-employee/report-employee.component';
import {ServicesCustomerComponent} from './component/services/services-customer/services-customer.component';
import {EmployeeServeListComponent} from './component/employee/employee-serve-list/employee-serve-list.component';
import {LoginComponent} from "./component/login/login.component";
import {AdminComponent} from "./admin/admin.component";


const routes: Routes = [
  {path: 'equipments', component: EquipmentListComponent},
  {path: 'services', component: ServicesListComponent},
  {path: 'information_customer/:id/:monthYear', component: ServicesDetailComponent},
  {path: 'services-customer', component: ServicesCustomerComponent},
  {path: 'services-customer/:id', component: ServicesCustomerComponent},
  {path: 'equipments-building', component: EquipmentBuildingComponent},
  {
    path: "login", component: LoginComponent,
  },
  {
    path: "admin", component: AdminComponent,
  },
  {
    path: 'buildings',
    component: BuildingListComponent,
  },
  {
    path: 'floors',
    component: FloorListComponent,
  },
  {
    path: 'grounds',
    component: GroundListComponent,
  },
  {path: '', component: HomeComponent},
  {
    path: 'contracts',
    component: ContractsComponent,
    children: [
      {
        path: 'paging',
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
      },
      // {
      //   path: 'paging',
      //   component: CustomerListComponent
      // },
    ]
  },
  {path: 'equipments-building', component: EquipmentBuildingComponent},
  {
    path: 'buildings',
    component: BuildingListComponent,
  },
  {
    path: 'floors',
    component: FloorListComponent,
  },
  {
    path: 'grounds',
    component: GroundListComponent,
  },
  {path: '', component: HomeComponent},
  {
    path: 'contracts',
    component: ContractsComponent,
    children: [
      {
        path: 'paging',
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
      },
      // {
      //   path: 'paging',
      //   component: CustomerListComponent
      // },
    ]
  },
  {


      path: 'employees',
      component: EmployeesComponent,
      children: [
        {
          path: '',
          component: EmployeeListComponent,
        },
        {
          path: 'paging1',
          component: EmployeeServeListComponent,
        }
        // {
        //   path: 'paging',
        //   component: CustomerListComponent
        // },
      ]
    },
    {
      path: 'reports',
      component: ReportsComponent,
      children: [
        {
          path: 'search',
          component: ReportListComponent
        },
        {
          path: 'employee',
          component: ReportEmployeeComponent
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
