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
import {FloorListComponent} from './component/floor/floor-list/floor-list.component';
import {ContractsComponent} from './component/contract/contracts/contracts.component';
import {ContractEditComponent} from './component/contract/contract-edit/contract-edit.component';
import {ContractDetailComponent} from './component/contract/contract-detail/contract-detail.component';
import {ContractDeleteComponent} from './component/contract/contract-delete/contract-delete.component';
import {ContractAddComponent} from './component/contract/contract-add/contract-add.component';
import {HomeComponent} from './component/home/home.component';
import { ViewBuildingComponent } from './component/building/view-building/view-building.component';
import { AddBuildingComponent } from './component/building/add-building/add-building.component';
import { ListBuildingComponent } from './component/building/list-building/list-building.component';
import { DeleteBuildingComponent } from './component/building/delete-building/delete-building.component';
import { EditBuildingComponent } from './component/building/edit-building/edit-building.component';


@NgModule({
  declarations: [
    AppComponent,
    ContractListComponent,
    CustomerListComponent,
    EquipmentListComponent,
    FloorListComponent,
    ContractsComponent,
    ContractEditComponent,
    ContractDetailComponent,
    ContractDeleteComponent,
    ContractAddComponent,
    HomeComponent,
    ViewBuildingComponent,
    AddBuildingComponent,
    ListBuildingComponent,
    DeleteBuildingComponent,
    EditBuildingComponent
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
    AddBuildingComponent,
    ViewBuildingComponent,
    EditBuildingComponent,
    DeleteBuildingComponent

  ]
})
export class AppModule {
}
