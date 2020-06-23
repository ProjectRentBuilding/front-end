import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../../service/contract.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ReportService} from "../../../service/report.service";
import {ReportModel} from "../../../model/report.model";

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  public report: ReportModel;
  public reports: ReportModel[] = [];

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

      // let chart = new CanvasJS.Chart("chartContainer", {
      //   animationEnabled: true,
      //   exportEnabled: true,
      //   title: {
      //     text: "Basic Column Chart in Angular"
      //   },
      //   data: [{
      //     type: "column",
      //     dataPoints: [
      //       { y: 71, label: "Apple" },
      //       { y: 55, label: "Mango" },
      //       { y: 50, label: "Orange" },
      //       { y: 65, label: "Banana" },
      //       { y: 95, label: "Pineapple" },
      //       { y: 68, label: "Pears" },
      //       { y: 28, label: "Grapes" },
      //       { y: 34, label: "Lychee" },
      //       { y: 14, label: "Jackfruit" }
      //     ]
      //   }]
      // });
      //
      // chart.render();

      }
    );


  }

}
