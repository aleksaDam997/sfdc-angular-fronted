import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  public password: string = "";
  public showSpinner: boolean = false;

  public errorMessage: string = "";

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  public async login(): Promise<void> {

    this.showSpinner = true;
    
    const res = await this.service.doLogin(this.username, this.password).then(res => {
      if(res.status === 'ok'){

        window.localStorage.setItem('access_token', res.access_token);
        window.localStorage.setItem('refresh_token', res.refresh_token);

        this.router.navigate(['']);
      }else if(res.status === 'login'){
        this.errorMessage = res.message;
        this.showSpinner = false;

        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
      }
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

    console.log(res);
    

  }
}
