import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { BuildingListComponent } from './component/building/building-list/building-list.component';
import { ContractListComponent } from './component/contract/contract-list/contract-list.component';
import { CustomerListComponent } from './component/customer/customer-list/customer-list.component';
import { EquipmentListComponent } from './component/equipment/equipment-list/equipment-list.component';
import { FloorListComponent } from './component/floor/floor-list/floor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildingListComponent,
    ContractListComponent,
    CustomerListComponent,
    EquipmentListComponent,
    FloorListComponent
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
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},{provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}],
  bootstrap: [AppComponent],
  entryComponents: [

  ]
})
export class AppModule { }
