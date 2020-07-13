import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-instructor-admin',
  templateUrl: './create-instructor-admin.component.html',
  styleUrls: ['./create-instructor-admin.component.css']
})
export class CreateInstructorAdminComponent implements OnInit {
  listError: any = "";
  form: any = {};
  registerForm: FormGroup

  validation_messages = {
    'nameInstructor': [
      { type: 'required', message: 'Tên của giáo viên không được để trống.' }
    ],
    'address': [
      { type: 'required', message: 'Địa chỉ của giáo viên không được để trống.' }
    ],
    'phoneNumber': [
      { type: 'required', message: 'Số điện thoại của giáo viên không được để trống.' },
      { type: 'pattern', message: 'Số điện thoại không đúng định dạng (0xxxxxxxxx)'}
    ],
    'salary': [
      { type: 'required', message: 'Lương của giáo viên không được để trống.' },
      { type: 'min', message: 'Lương tối thiểu phải được 1000.' }
    ],
    'email': [
      { type: 'required', message: 'Email của giáo viên không được để trống.' },
      { type: 'pattern', message: 'Email của giáo viên không đúng định dạng'}
    ],
    'specialize': [
      { type: 'required', message: 'Chuyên ngành của giáo viên không được để trống.' }
    ],
    'username': [
      { type: 'required', message: 'username của giáo viên không được để trống.' }
    ],
    'password': [
      { type: 'required', message: 'password của giáo viên không được để trống.' },
      { type: 'minlength',message: 'Độ dài password của giáo viên phải tối thiểu 5 kí tự'},
      { type: 'maxlength',message: 'Độ dài password của giáo viên tối đa 30 kí tự'},
    ],
  }
  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router, private matDialogref : MatDialogRef<CreateInstructorAdminComponent>) { }

  ngOnInit() {
    this.createFormRegister();
  }
  createFormRegister() {
    this.registerForm = this.fb.group({
      nameInstructor: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(0)+([0-9]{9})$")
      ])),
      salary: new FormControl('', Validators.compose([
        Validators.min(1000),
        Validators.required
      ])),
      level: new FormControl('', Validators.compose([
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$")
      ])),
      description: new FormControl('', Validators.compose([
      ])),
      specialize: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      username: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('',Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.required
      ]))
    })
  }
  
  createInstructor() {
    if (this.registerForm.valid) {
      this.adminService.createCourse(this.registerForm.value).subscribe(data => {
        alert("Bạn đã tạo giáo viên thành công");
        this.matDialogref.close();
      }, error => {
        if (error.status === 400) {
          this.listError = error.error;
        }
        if (error.status === 500) {
          alert("username bạn tạo đã có.")
        }
      })
    }
  }

}
