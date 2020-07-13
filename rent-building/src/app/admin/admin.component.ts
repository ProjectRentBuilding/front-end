import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: String;
  constructor(private accountService: AccountService,private router:Router,private tokenStorageService:TokenStorageService) { }

  ngOnInit() {
      this.username=this.tokenStorageService.getUsername();
  }
  showLogout() {
    $('#myModalLogout').modal('show');
  }
  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login')
  }

}
