import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const ShareModules =[
  ReactiveFormsModule,
  FormsModule,
  NgMatSearchBarModule,
  FlexLayoutModule,
  NgbModalModule,
]
@NgModule({
  declarations: [],
  imports: [
   ShareModules,
   FlatpickrModule.forRoot(),
   CalendarModule.forRoot({
     provide: DateAdapter,
     useFactory: adapterFactory
   })
  ],
   exports: [
    ShareModules
  ]
})
export class ShareModule { }
