import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { AuthJwtService } from 'src/app/auth/auth-jwt.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  userInfo: AuthLoginInfo;
  message="";

  constructor(private auth: AuthJwtService, private fb: FormBuilder,
              private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      passwordUser: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    this.userInfo = new AuthLoginInfo(this.fusername.value, this.fpassword.value);
    this.login(this.userInfo);
  }

  get fusername() {
    return this.loginForm.get('username');
  }
  get fpassword() {
    return this.loginForm.get('passwordUser');
  }
  public login(userInfo) {
    console.log(userInfo)
    this.auth.attemptAuth(userInfo).subscribe(
      data => {
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        if(this.tokenStorage.getAuthorities().indexOf("ROLE_ADMIN")!=-1) {
          // this.router.navigateByUrl("/")
          this.redirectTo("admin");
        }
        console.log(this.tokenStorage.getAuthorities())
      },
      error => {
        console.log("Error ", error);
        this.message = "Tên đăng nhập không tồn tại hoặc sai mật khẩu";
      }
    );
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

}
