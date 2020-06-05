import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MAT_CHECKBOX_CLICK_ACTION, MatCheckboxModule} from "@angular/material/checkbox";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {ContractListComponent} from './component/contract/contract-list/contract-list.component';
import {CustomerListComponent} from './component/customer/customer-list/customer-list.component';
import {EquipmentListComponent} from './component/equipment/equipment-list/equipment-list.component';
import {ContractsComponent} from './component/contract/contracts/contracts.component';
import {ContractEditComponent} from './component/contract/contract-edit/contract-edit.component';
import {ContractDetailComponent} from './component/contract/contract-detail/contract-detail.component';
import {ContractDeleteComponent} from './component/contract/contract-delete/contract-delete.component';
import {ContractAddComponent} from './component/contract/contract-add/contract-add.component';
import {HomeComponent} from './component/home/home.component';
<<<<<<< HEAD
import { BuildingEditComponent } from './component/building/building-edit/building-edit.component';
import { BuildingDeleteComponent } from './component/building/building-delete/building-delete.component';
import { BuildingDetailComponent } from './component/building/building-detail/building-detail.component';
import {BuildingAddComponent} from './component/building/building-add/building-add.component';
import {BuildingListComponent} from './component/building/building-list/building-list.component';
import { FloorListComponent } from './component/floor/floor-list/floor-list.component';
import { FloorAddComponent } from './component/floor/floor-add/floor-add.component';
import { FloorEditComponent } from './component/floor/floor-edit/floor-edit.component';
import { FloorDeleteComponent } from './component/floor/floor-delete/floor-delete.component';


=======
import {AddBuildingComponent} from './component/building/add-building/add-building.component';
import {EditBuildingComponent} from './component/building/edit-building/edit-building.component';
import {DeleteBuildingComponent} from './component/building/delete-building/delete-building.component';
import {ViewBuildingComponent} from './component/building/view-building/view-building.component';
import {ListBuildingComponent} from './component/building/list-building/list-building.component';
import { CustomersComponent } from './component/customer/customers/customers.component';
import { CustomerDeleteComponent } from './component/customer/customer-delete/customer-delete.component';
import { EquipmentDeleteComponent } from './component/equipment/equipment-delete/equipment-delete.component';
>>>>>>> 7a313af83c92ccbe4c6200a0849c8be5b75bad74



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
<<<<<<< HEAD
    BuildingListComponent,
    BuildingEditComponent,
    BuildingDeleteComponent,
    BuildingDetailComponent,
    BuildingAddComponent,
    FloorListComponent,
    FloorAddComponent,
    FloorEditComponent,
    FloorDeleteComponent

=======
    AddBuildingComponent,
    EditBuildingComponent,
    DeleteBuildingComponent,
    ViewBuildingComponent,
    ListBuildingComponent,
    CustomersComponent,
    CustomerDeleteComponent,
    EquipmentDeleteComponent
>>>>>>> 7a313af83c92ccbe4c6200a0849c8be5b75bad74

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
    MatCheckboxModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}],
  bootstrap: [AppComponent],
  entryComponents: [
    ContractDeleteComponent,
<<<<<<< HEAD
    BuildingListComponent,
    BuildingAddComponent,
    BuildingEditComponent,
    BuildingDeleteComponent,
    BuildingDetailComponent,
    FloorAddComponent,
    FloorDeleteComponent,
    FloorEditComponent,
    FloorListComponent

=======
    AddBuildingComponent,
    EditBuildingComponent,
    ViewBuildingComponent,
    ListBuildingComponent,
    DeleteBuildingComponent,
    CustomerDeleteComponent,
    EquipmentDeleteComponent,
    DeleteBuildingComponent
>>>>>>> 7a313af83c92ccbe4c6200a0849c8be5b75bad74
  ]
})
export class AppModule {
}
