import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { Course } from 'src/app/model/Course';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { error } from 'util';
import { Instructor } from 'src/app/model/Instructor';
import { CreateInstructorAdminComponent } from '../create-instructor-admin/create-instructor-admin.component';
declare var $: any;

@Component({
  selector: 'app-list-instructor-admin',
  templateUrl: './list-instructor-admin.component.html',
  styleUrls: ['./list-instructor-admin.component.css']
})
export class ListInstructorAdminComponent implements OnInit {

  instructor: Instructor;

  displayedColumns = ['id', 'nameInstructor', 'address', 'phoneNumber', 'salary', 'deleted','action'];
  DataSource: MatTableDataSource<Course>;

  size = 5;
  pageClicked = 0;
  pages = [];
 
  search = '';
  isSearch = false;

  totalPages = 1;
  listError: any = "";
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private adminService: AdminService, public dialog: MatDialog) { }

  getAllCourse(): void {
    this.onSubmit(0);
  };
  ngOnInit() {
    this.getAllCourse();
  }
  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateInstructorAdminComponent, {
      width: '40%',
      height: '85%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  };
  showModalDelete(id) {
    // this.instructor = new Instructor(element.id, element.nameCourse)
    // $('#myModal').modal('show');
  }
  deleteCourse(id: number) {
    // this.adminService.deleteCourse(id).subscribe(data => {
    //   alert("Bạn đã xóa thành công khóa học.");
    //   this.ngOnInit();
    // }, error => {
    //   alert("Xóa không thành công.")
    // })
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
    this.adminService.getAllInstructor(page, this.size, this.search).subscribe(
      data => {
        console.log(data)
        this.pageClicked = page;
        this.DataSource = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, { length: this.totalPages }).map(Number.call, Number);
        this.DataSource.sort = this.sort;
      }, error => {
        if (error.status == 401) {
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
    // this.adminService.updateCourse(element).subscribe(data=>{
    //     alert("Bạn đã cập nhật khóa học thành công");
    //     this.ngOnInit();
    // },error =>{
    //   if (error.status === 400) {
    //     console.log(error)
    //     this.listError = error.error;
    //     console.log(this.listError.nameCourse)
    //     this.elementIdError=element.id;
    //   }
    //   if (error.status === 500) {
    //     alert("Tên khóa học đã tồn tại")
    //     this.ngOnInit();
    //   }

    // })
  }

}
