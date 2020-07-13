import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCourseComponent } from './course/list-course/list-course.component';
import { AdminComponent } from './admin.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { ListInstructorAdminComponent } from './instructor/list-instructor-admin/list-instructor-admin.component';

const adminRoutes: Routes = [
    {
        path: "admin", component: AdminComponent , canActivate: [AuthGuard] , children: [
            {
                path: "course", component: ListCourseComponent, children: [
                    { path: "create-course", component: CreateCourseComponent }
                ]
            },
            {
                path: "instructor", component: ListInstructorAdminComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }