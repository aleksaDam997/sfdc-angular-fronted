import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface TrainingDto {
  inputs: number[][] ;
	labels: number[][];
  epochs: number;
  nodes: number[];

}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly path = "http://localhost:8080/api/category/";
  private readonly pathNN = "http://localhost:8080/api/neural/network/train/"


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

   async trainNetwork(data: TrainingDto) {
    // const my_token = this.getAccessToken();

    //   const header =  new HttpHeaders({
    //       'Authorization': 'Bearer ' + my_token,
    //        'Content-Type': 'application/json'
    //           });
  
    //   let options = {
    //     headers: header
        
    // };

    const trainingDto: TrainingDto = {
      inputs: data.inputs,
      labels: data.labels,
      epochs: data.epochs,
      nodes: data.nodes
    }

    return await this.http.post<string>("http://localhost:8080/api/neural/network/train", trainingDto, {responseType: 'json'}).toPromise();
   }

   async predict(data: {value1: number; value2: number}) {


    const predict = {
      value1: data.value1,
      value2: data.value2
    }

    return await this.http.post<any>("http://localhost:8080/api/neural/network/predict", predict, {responseType: 'json'}).toPromise();
   }

  }
