import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EmployeeService} from '../../../service/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {

  public employeeName;
  public employeeId;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public employeeService: EmployeeService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.employeeName = this.data.data1.name;
    this.employeeId = this.data.data1.id;
  }

  deleteEmployee() {
    this.employeeService.delete(this.employeeId).subscribe(data => {
      this.afterDeleteEmployee();
    });
  }

  afterDeleteEmployee() {
    this.dialogRef.close();
    this.redirectTo('employees');
    this.employeeService.showNotification('', 'Xóa thành công, chúc mừng bạn');

  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

}

