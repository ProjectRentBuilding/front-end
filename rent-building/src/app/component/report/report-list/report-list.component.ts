import {Component, OnInit} from '@angular/core';
import {ContractService} from '../../../service/contract.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../../service/report.service';
import {ReportModel} from '../../../model/report.model';
import {Chart} from 'node_modules/chart.js';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  public report: ReportModel;
  public reports: ReportModel[] = [];
  public totalMoney = 0;
  public startRentDay = "";
  public endRentDay = "";
  public minTotal = "";
  public maxTotal = "";
  public codeGround = "";
  public formSearch: FormGroup;
  public message = "";

  constructor(
    public reportService: ReportService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.refreshForm();

    this.formSearch = this.formBuilder.group({
      startRentDay: [''],
      endRentDay: [''],
      minTotal: [''],
      maxTotal: [''],
      codeGround: ['']
    });

  }

  loadData() {
    this.reportService.getAllReportAndSearchAll(this.startRentDay, this.endRentDay, this.minTotal, this.maxTotal, this.codeGround).subscribe(data => {
        this.reports = data;
      }, () => {
      }, () => {
        const xlable = [];
        const ylable = [];

        for (let i = 0; i < this.reports.length; i++) {
          this.totalMoney += this.reports[i].totalCal;
          xlable.push(this.reports[i].codeGroundCal);
          ylable.push(this.reports[i].totalCal);
        }
        console.log(xlable);

        console.log(this.reports);


        const canvas = <HTMLCanvasElement>document.getElementById('chart');
        const ctx = canvas.getContext('2d');


        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: xlable,
            datasets: [{
              label: 'Biểu đồ báo cáo tổng hợp',
              data: ylable,
              backgroundColor:
                'rgba(191, 85, 236, 1)',
              borderColor:
                'rgba(191, 85, 236, 1)',
              borderWidth: 1
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                }
              }
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    callback: function (label, index, labels) {
                      return label / 1000000 + 'tr';
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: '1tr = 1,000,000 VNĐ'
                  }
                }
              ]
            }
          }
        });
      }
    );
  }

  printToPDF() {
    const options = {
      // name : 'baocao.pdf',
      // image : {type : 'jpeg', quality: 0.98},
      // html2canvas: {},
      // jsPDF : {unit: 'in', format: 'A4', orientation: 'landscape'}

      // margin:       0.25,
      // filename:     'filename',
      // image:        { type: 'jpeg', quality: 0.98 },
      // html2canvas:  { dpi: 96, letterRendering: true },
      // jsPDF:        { unit: 'in', format: 'a3', orientation: 'portrait' }

      name: 'baocao.pdf',
      image: {type: 'jpeg'},
      html2canvas: {scales: 1, width: 7000, height: 5000},
      jsPDF: {orientation: 'portrait', unit: 'mm', format: [1000, 1000]}
    };

    const element: Element = document.getElementById('html2pdfid');

    html2pdf()
      .from(element)
      .set(options)
      .save();

  }

  refreshForm() {
    this.totalMoney = 0;
    this.reportService.getAllReport().subscribe(data => {
        this.reports = data;
      }, () => {
      }, () => {
        const xlable = [];
        const ylable = [];

        for (let i = 0; i < this.reports.length; i++) {
          this.totalMoney += this.reports[i].totalCal;
          xlable.push(this.reports[i].codeGroundCal);
          ylable.push(this.reports[i].totalCal);
        }
        console.log(xlable);

        console.log(this.reports);


        const canvas = <HTMLCanvasElement>document.getElementById('chart');
        const ctx = canvas.getContext('2d');


        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: xlable,
            datasets: [{
              label: 'Biểu đồ báo cáo tổng hợp',
              data: ylable,
              backgroundColor:
                'rgba(191, 85, 236, 1)',
              borderColor:
                'rgba(191, 85, 236, 1)',
              borderWidth: 1
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                }
              }
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    callback: function (label, index, labels) {
                      return label / 1000000 + 'tr';
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: '1tr = 1,000,000 VNĐ'
                  }
                }
              ]
            }
          }
        });
      }
    );
  }

  onSearch() {
    this.startRentDay = this.formSearch.value.startRentDay;
    this.endRentDay = this.formSearch.value.endRentDay;
    this.minTotal = this.formSearch.value.minTotal;
    this.maxTotal = this.formSearch.value.maxTotal;
    this.codeGround = this.formSearch.value.codeGround;

    let start = new Date(this.startRentDay);
    let end = new Date(this.endRentDay);


    let resultStart;
    let resultEnd;

    if (isNaN(start.getFullYear())) {
      resultStart = "1900-01-01";
    } else {
      resultStart = "" + start.getFullYear() + "-" + start.getMonth() + "-" + start.getDay();
    }

    if (isNaN(end.getFullYear())) {
      resultEnd = "2030-01-01";
    } else {
      resultEnd = "" + end.getFullYear() + "-" + end.getMonth() + "-" + end.getDay();
    }


    this.reportService.getAllReportAndSearchAll(resultStart, resultEnd, this.minTotal, this.maxTotal, this.codeGround)
      .subscribe(
        data => {
          this.reports = data;
        }, () => {

        }, () => {

          this.totalMoney = 0;

          for (let i = 0; i < this.reports.length; i++) {
            this.totalMoney += this.reports[i].totalCal;
          }

          if (this.reports.length == 0) {
            this.message = "Không tìm thấy kết quả nào phù hợp.";
          } else {
            this.message = "";
          }
        }
      );

  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
