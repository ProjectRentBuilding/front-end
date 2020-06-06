import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GroundModel} from '../../../model/ground.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {GroundService} from '../../../service/ground.service';
import {GroundDeleteComponent} from '../ground-delete/ground-delete.component';

@Component({
  selector: 'app-ground-list',
  templateUrl: './ground-list.component.html',
  styleUrls: ['./ground-list.component.css']
})
export class GroundListComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public grounds: GroundModel[];
  public totalRec: number;
  public flag = false;
  public checkEdit = false;
  public checkAdd = false;
  public page = 1;
  public searchText;
  addGroundForm: FormGroup;
  public groundOfId;

  constructor(
    public groundService: GroundService,
    public dialog: MatDialog,
    public routerService: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.subscription = this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
      this.totalRec = this.grounds.length;
    });
    this.addGroundForm = this.fb.group({
      codeGround: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      typeGround: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      area: ['',[Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^([1-9]([0-9])?)|([0-9]([1-9])?)$/)]]
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addNewGround() {
    this.groundService.save(this.addGroundForm.value).subscribe(data => {
      this.redirectTo('grounds');
      this.groundService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
    });
  }
  redirectTo(uri:string) {
    this.routerService.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.routerService.navigate([uri]));
  }

  checkAddNewGround() {
    if (!this.checkAdd) {
      this.ngOnInit();
      this.checkAdd = true;
      this.checkEdit = false;
    }
  }

  checkEditGround(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.checkAdd = false;
      this.flag = id;
      this.groundOfId = id;
      this.groundService.findOne(this.groundOfId).subscribe(data => {
        this.addGroundForm.patchValue(data);
      });
    }
  }
  editGround() {
    this.groundService.update(this.addGroundForm.value, this.groundOfId).subscribe(data => {
      this.redirectTo('grounds');
      this.groundService.showNotification('', 'Sửa thành công, chúc mừng bạn');
    });
  }
  close() {
    this.redirectTo('grounds');
  }

  openDialogDelete(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundDeleteComponent, {
        width: '500px',
        height: '240px',
        data: {data1: dataOfGroundModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }
}
