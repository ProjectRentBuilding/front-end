import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { Course } from 'src/app/model/Course';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { error } from 'util';
declare var $: any;
@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
 
  course: Course = new Course(0, "");
  displayedColumns = ['id', 'nameCourse','deleted' ,'action'];
  DataSource: MatTableDataSource<Course>;
  userData: any[] = [];
  size = 5;
  pageClicked = 0;
  pages= [];
  listError: any = "";
  elementIdError=-1;
  search = '';
  totalPages = 1;
  isSearch = false;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private activatedRoute: ActivatedRoute,private router:Router, private adminService: AdminService, public dialog: MatDialog) { }

  getAllCourse(): void {
   this.onSubmit(0);
  };
  ngOnInit() {
    this.elementIdError=-1;
    this.getAllCourse();
    
  }
  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateCourseComponent, {
      width: '40%',
      height: '250px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  };
  showModalDelete(element) {
    this.course = new Course(element.id, element.nameCourse)
    $('#myModal').modal('show');
  }
  deleteCourse(id: number) {
    this.adminService.deleteCourse(id).subscribe(data => {
      alert("Bạn đã xóa thành công khóa học.");
      this.ngOnInit();
    }, error => {
      alert("Xóa không thành công.")
    })
  }
  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }
  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }
  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }
  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }
  onSubmit(page) {
    this.adminService.getAllCourse(page, this.size, this.search).subscribe(
      data => {
        console.log(data.content)
        this.pageClicked = page;
        this.DataSource = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, { length: this.totalPages }).map(Number.call, Number);
        this.DataSource.sort = this.sort;
      },error => {
        if(error.status==401) {
          alert("Bạn không có quyền vào trang này.Mời bạn đăng nhập.")
          this.router.navigateByUrl('/login')
        }
      }
    );
  }
  searchName() {
    if (this.search === '') {
      this.isSearch = false;
      this.ngOnInit();
    } else {
      this.isSearch = true;
      this.onSubmit(0);
    }
  }
  backToSearch() {
    this.search = '';
    this.isSearch = false;
    this.ngOnInit();
    
  }
  updateCourse(element) {
    if(element.deleted=='true') {
      element.deleted=true;
    } else if(element.deleted=='false'){
      element.deleted= false;
    }
    this.adminService.updateCourse(element).subscribe(data=>{
        alert("Bạn đã cập nhật khóa học thành công");
        this.ngOnInit();
    },error =>{
      if (error.status === 400) {
        console.log(error)
        this.listError = error.error;
        console.log(this.listError.nameCourse)
        this.elementIdError=element.id;
      }
      if (error.status === 500) {
        alert("Tên khóa học đã tồn tại")
        this.ngOnInit();
      }
     
    })
  }
}
