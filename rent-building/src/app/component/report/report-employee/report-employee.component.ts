import {Component, OnInit} from '@angular/core';
import {Sort} from "@angular/material/sort";
import * as html2pdf from 'html2pdf.js';
import {EmployeeService} from "../../../service/employee.service";

@Component({
  selector: 'app-report-employee',
  templateUrl: './report-employee.component.html',
  styleUrls: ['./report-employee.component.css']
})
export class ReportEmployeeComponent implements OnInit {

  public employees: any;
  public sortedData: any;
  public totalSalary = 0;


  constructor(
    public employeeService: EmployeeService
  ) {

  }

  ngOnInit() {

    this.employeeService.getSalary().subscribe(data => {
      this.employees = data;
    }, () => {

    }, () => {
      this.sortedData = this.employees.slice();

      for (let i = 0; i <this.employees.length ; i++) {
        this.totalSalary += this.employees[i].salary;
      }
    });
  }

  printToPDF() {
    const options = {
      name: 'bangluong.pdf',
      image: {type: 'jpeg'},
      html2canvas: {scales: 1, width: 3000, height: 3000},
      jsPDF: {orientation: 'portrait', unit: 'mm', format: [300, 300]}
    };

    const element: Element = document.getElementById('html2pdfidemployee');

    html2pdf()
      .from(element)
      .set(options)
      .save();
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
