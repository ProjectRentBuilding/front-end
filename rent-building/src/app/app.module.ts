import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatTableModule} from '@angular/material/table';


import {MatSortModule} from '@angular/material/sort';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MAT_CHECKBOX_CLICK_ACTION, MatCheckboxModule} from '@angular/material/checkbox';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ContractListComponent} from './component/contract/contract-list/contract-list.component';
import {CustomerListComponent} from './component/customer/customer-list/customer-list.component';
import {EquipmentListComponent} from './component/equipment/equipment-list/equipment-list.component';
import {ContractsComponent} from './component/contract/contracts/contracts.component';
import {ContractEditComponent} from './component/contract/contract-edit/contract-edit.component';
import {ContractDetailComponent} from './component/contract/contract-detail/contract-detail.component';
import {ContractDeleteComponent} from './component/contract/contract-delete/contract-delete.component';
import {ContractAddComponent} from './component/contract/contract-add/contract-add.component';
import {HomeComponent} from './component/home/home.component';
import {BuildingEditComponent} from './component/building/building-edit/building-edit.component';
import {BuildingDeleteComponent} from './component/building/building-delete/building-delete.component';
import {BuildingDetailComponent} from './component/building/building-detail/building-detail.component';
import {BuildingAddComponent} from './component/building/building-add/building-add.component';
import {BuildingListComponent} from './component/building/building-list/building-list.component';
import {FloorListComponent} from './component/floor/floor-list/floor-list.component';
import {FloorDeleteComponent} from './component/floor/floor-delete/floor-delete.component';
import {CustomersComponent} from './component/customer/customers/customers.component';
import {CustomerDeleteComponent} from './component/customer/customer-delete/customer-delete.component';
import {EquipmentDeleteComponent} from './component/equipment/equipment-delete/equipment-delete.component';
import {GroundListComponent} from './component/ground/ground-list/ground-list.component';
import {GroundDeleteComponent} from './component/ground/ground-delete/ground-delete.component';
import {GroundAddComponent} from './component/ground/ground-add/ground-add.component';
import {GroundEditComponent} from './component/ground/ground-edit/ground-edit.component';
import {GroundDetailComponent} from './component/ground/ground-detail/ground-detail.component';
import {ImageGalleryComponent} from './component/building/building-add/image-gallery/image-gallery.component';
import {EquipmentBuildingComponent} from './component/equipment/equipment-building/equipment-building.component';
import {CustomerAddComponent} from './component/customer/customer-add/customer-add.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CustomerDetailGroundComponent} from './component/customer/customer-detail-ground/customer-detail-ground.component';
import {EquipmentAddComponent} from './component/equipment/equipment-add/equipment-add.component';

import { EmployeeListComponent } from './component/employee/employee-list/employee-list.component';
import { EmployeeAddComponent } from './component/employee/employee-add/employee-add.component';
import { EmployeesComponent } from './component/employee/employees/employees.component';
import { EmployeeDeleteComponent } from './component/employee/employee-delete/employee-delete.component';
import { EmployeeRegisterComponent } from './component/employee/employee-register/employee-register.component';
import {ServicesListComponent} from './component/services/services-list/services-list.component';
import {MatIconModule} from '@angular/material/icon';
import { ReportsComponent } from './component/report/reports/reports.component';
import { ReportListComponent } from './component/report/report-list/report-list.component';
import { ServicesDetailComponent } from './component/services/services-detail/services-detail.component';
import { ServicesAddComponent } from './component/services/services-add/services-add.component';
import { ServicesEditComponent } from './component/services/services-edit/services-edit.component';
import { ServicesDeleteComponent } from './component/services/services-delete/services-delete.component';
import { ReportEmployeeComponent } from './component/report/report-employee/report-employee.component';
import { ServicesCustomerComponent } from './component/services/services-customer/services-customer.component';
import { ServicesInvoiceComponent } from './component/services/services-invoice/services-invoice.component';
import { EmployeeServeComponent } from './component/employee/employee-serve/employee-serve.component';
import { EmployeeServeListComponent } from './component/employee/employee-serve-list/employee-serve-list.component';
import { EmployeeServeDeleteComponent } from './component/employee/employee-serve-delete/employee-serve-delete.component';
import { ExportAsModule } from 'ngx-export-as';
import { ServicesPaymentComponent } from './component/services/services-payment/services-payment.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ContractListComponent,
    CustomerListComponent,
    EquipmentListComponent,
    ContractsComponent,
    ContractEditComponent,
    ContractDetailComponent,
    ContractDeleteComponent,
    ContractAddComponent,
    HomeComponent,
    BuildingListComponent,
    BuildingEditComponent,
    BuildingDeleteComponent,
    BuildingDetailComponent,
    BuildingAddComponent,
    FloorListComponent,
    FloorDeleteComponent,
    CustomersComponent,
    CustomerDeleteComponent,
    EquipmentDeleteComponent,
    GroundListComponent,
    GroundDeleteComponent,
    GroundAddComponent,
    GroundEditComponent,
    GroundDetailComponent,
    ImageGalleryComponent,
    EquipmentBuildingComponent,
    CustomerAddComponent,
    CustomerDetailGroundComponent,
    EquipmentAddComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeesComponent,
    EmployeeDeleteComponent,
    EmployeeRegisterComponent,
    ReportsComponent,
    ReportListComponent,
    ServicesListComponent,
    ServicesDetailComponent,
    ServicesAddComponent,
    ServicesEditComponent,
    ServicesDeleteComponent,
    ReportEmployeeComponent,
    ServicesCustomerComponent,
    ServicesInvoiceComponent,
    EmployeeServeComponent,
    EmployeeServeListComponent,
    EmployeeServeDeleteComponent,
    ServicesPaymentComponent,
    LoginComponent,
    AdminComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        Ng2SearchPipeModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatIconModule,
        ExportAsModule
    ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}],

  bootstrap: [AppComponent],
  entryComponents: [
    ContractDeleteComponent,
    BuildingListComponent,
    BuildingAddComponent,
    BuildingEditComponent,
    BuildingDeleteComponent,
    BuildingDetailComponent,
    FloorDeleteComponent,
    FloorListComponent,
    GroundDeleteComponent,
    GroundListComponent,
    GroundAddComponent,
    GroundEditComponent,
    GroundDetailComponent,
    CustomerDeleteComponent,
    EmployeeDeleteComponent,
    CustomerAddComponent,
    CustomerDetailGroundComponent,
    EquipmentDeleteComponent,
    EquipmentAddComponent,
    ImageGalleryComponent,
    ServicesListComponent,
    ServicesAddComponent,
    ServicesEditComponent,
    ServicesDeleteComponent,
    EmployeeRegisterComponent,
    ServicesCustomerComponent,
    ServicesInvoiceComponent,
    EmployeeServeDeleteComponent,
    ServicesPaymentComponent

  ]
})
export class AppModule {
}
