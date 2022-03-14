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
    console.log(username + "  " + password);

      let body = new URLSearchParams();
      body.set('username', username);
      body.set('password', password);

      let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };

      const finalPath = this.path + "api/login";

      return await this.http.post<any>(finalPath, body.toString(), options).toPromise();
  }

  public refreshToken() {
      
  }
}
