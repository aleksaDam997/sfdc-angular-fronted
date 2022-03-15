import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../dto/login.dto';
import { Observer } from 'rxjs';

interface ApiResponse {
  status: 'ok' | 'login' | 'error'
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly path = "http://localhost:8080/";
  res: ApiResponse = {
    status: "login",
    data: ""
  };

  constructor(private http: HttpClient) {
  }

  public async doLogin(username: string, password: string): Promise<any> {

      let body = new URLSearchParams();
      body.set('username', username);
      body.set('password', password);

      let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };

      const finalPath = this.path + "api/login";

      return await this.http.post<any>(finalPath, body.toString(), options).toPromise();
  }

  async refreshToken() {
    const my_token = this.getRefreshToken();

    const header =  new HttpHeaders({
        'Authorization': 'Bearer ' + my_token,
         'Content-Type': 'application/json'
            });

    let options = {
      headers: header
      
  };

     return await this.http.get<any>(this.path + "api/token/refresh", options).toPromise();
  }

  private getRefreshToken(): string {
    const token = window.localStorage.getItem('refresh_token');

    if(token !== null) {
      return token;
    }

    return "";
  }
}
