import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ListCourseComponent } from './course/list-course/list-course.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { ShareModule } from '../share/share/share.module';
import { MaterialModule } from '../share/material/material.module';
import { ListInstructorAdminComponent } from './instructor/list-instructor-admin/list-instructor-admin.component';
import { CreateInstructorAdminComponent } from './instructor/create-instructor-admin/create-instructor-admin.component';


@NgModule({
  declarations: [
    ListCourseComponent,
    CreateCourseComponent,
    ListInstructorAdminComponent,
    CreateInstructorAdminComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    ShareModule
  ],
  entryComponents: [CreateCourseComponent, CreateInstructorAdminComponent],
})
export class AdminModule { }
