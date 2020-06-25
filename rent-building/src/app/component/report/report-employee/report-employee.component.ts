import {Component, OnInit} from '@angular/core';
import {Sort} from "@angular/material/sort";
import {EmployeeModel} from "../../../model/employee";

@Component({
  selector: 'app-report-employee',
  templateUrl: './report-employee.component.html',
  styleUrls: ['./report-employee.component.css']
})
export class ReportEmployeeComponent implements OnInit {

  public employees: any;
  public sortedData: any;

  constructor() {
  }

  ngOnInit() {
    this.employees = [
      {
        nameEmployeeCal: 'tran ngoc tan',
        partCal: 'bao ve',
        salaryCal: '2000'
      },
      {
        nameEmployeeCal: 'le dinh quoc',
        partCal: 'quet rac',
        salaryCal: '3000'
      },
      {
        nameEmployeeCal: 'vo minh hung',
        partCal: 'boi com',
        salaryCal: '2500'
      }
    ];
    this.sortedData = this.employees.slice();
  }

  printToPDF() {

  }

  sortData(sort: Sort) {
    const data = this.employees.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nameEmployeeCal':
          return compare(a.nameEmployeeCal, b.nameEmployeeCal, isAsc);
        case 'partCal':
          return compare(a.partCal, b.partCal, isAsc);
        case 'salaryCal':
          return compare(a.salaryCal, b.salaryCal, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
