import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly path = "http://localhost:8080/api/category/";


  constructor(private http: HttpClient) {

   }

   async fetchCategories(): Promise<any[]> {

    const my_token = this.getAccessToken();

    const header =  new HttpHeaders({
        'Authorization': 'Bearer ' + my_token,
         'Content-Type': 'application/json'
            });

    let options = {
      headers: header
      
  };

     return await this.http.get<any>(this.path, options).toPromise();
   }


   getAccessToken(): string {
      const token = window.localStorage.getItem('access_token');

      if(token !== null){
        return token;
      }

      return "";
   }

   async fetchCategory(categoryId: number): Promise<any> {
    
    const my_token = this.getAccessToken();

    const header =  new HttpHeaders({
        'Authorization': 'Bearer ' + my_token,
         'Content-Type': 'application/json'
            });

    let options = {
      headers: header
      
  };

     return await this.http.get<any>(this.path + categoryId, options).toPromise();
   }

   async addCategory(category: {name: string; excerpt: string; value1: string;
    value2: string; value3: string; value4: string; value5: string; value6: string; value7: string;}){
      const my_token = this.getAccessToken();

      const header =  new HttpHeaders({
          'Authorization': 'Bearer ' + my_token,
           'Content-Type': 'application/json'
              });
  
      let options = {
        headers: header
        
    };

    const body = category;
  
       return await this.http.post<any>(this.path, body, options).toPromise();
   }
  }
