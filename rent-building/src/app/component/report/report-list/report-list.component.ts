import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../../service/contract.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ReportService} from "../../../service/report.service";
import {ReportModel} from "../../../model/report.model";
import {Chart} from "node_modules/chart.js"

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  public report: ReportModel;
  public reports: ReportModel[] = [];
  public totalMoney = 0;

  constructor(
    public reportService: ReportService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.reportService.getAllReport().subscribe(data => {
        this.reports = data;
      }, () => {
      }, () => {
        const xlable = [];
        const ylable = [];

        for (let i = 0; i < this.reports.length; i++) {
          this.totalMoney += this.reports[i].totalCal;
          xlable.push(this.reports[i].codeGroundCal);
          ylable.push(this.reports[i].totalCal)
        }
        console.log(xlable);

        console.log(this.reports);


        const canvas = <HTMLCanvasElement>document.getElementById("chart");
        const ctx = canvas.getContext('2d');


        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: xlable,
            datasets: [{
              label: 'Biểu đồ báo cáo tổng hợp',
              data: ylable,
              backgroundColor:
                'rgba(255, 99, 132, 0.2)',
              borderColor:
                'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });


      }
    );
  }
}
