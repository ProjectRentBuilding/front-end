import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  listError: any = "";
  form: any = {};
  registerForm: FormGroup

  validation_messages = {
    'nameCourse': [
      { type: 'required', message: 'Tên của khóa học không được để trống.' }
    ],
  }
  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router, private matDialogref : MatDialogRef<CreateCourseComponent>) { }

  ngOnInit() {
    this.createFormRegister();
  }
  createFormRegister() {
    this.registerForm = this.fb.group({
      nameCourse: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })
  }
  createCourse() {
    if (this.registerForm.valid) {
      this.adminService.createCourse(this.registerForm.value).subscribe(data => {
        alert("Bạn đã tạo khóa học thành công");
        this.matDialogref.close();
      }, error => {
        if (error.status === 400) {
          this.listError = error.error;
        }
        if (error.status === 500) {
          console.log("abc");
          alert("Khóa học bạn tạo đã có.")
        }
      })
    }
  }
}
