import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../dto/category.dto';
import { Data } from '../dto/data.dto';
import { ApiService } from '../service/api.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-train-neural-network',
  templateUrl: './train-neural-network.component.html',
  styleUrls: ['./train-neural-network.component.css']
})
export class TrainNeuralNetworkComponent implements OnInit {

  private paramMapSub: Subscription | null;
  public category?: Category;
  private inputs: number[][] = [];
  private labels: number[][] = [];

  public val1: 0 | 1 | 2 = 0;
  public val2: 0 | 1 | 2 = 0;
  public val3: 0 | 1 | 2 = 0;
  public val4: 0 | 1 | 2 = 0;

  private numbOFData: number = 0;

  public input1 = '';
  public input2 = '';
  public res: string = "";

  public trained: boolean  = false;
  public error: boolean = false;
  public trainingDone = false;

  valid = true;

  private catId = 0;

  public epochs: number = 50000;
  public numberOfLayers: number = 3;
  public arrayOfNodes = Array(this.numberOfLayers);
  

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private loginService: LoginService) { 
    
    this.paramMapSub = this.route.paramMap.subscribe(param => {
      this.catId = Number(param.get("catId"));
    });

    this.fetchCategory(this.catId);

  }

  predict() {
    this.apiService.predict({value1: Number(this.input1), value2: Number(this.input2)}).then(res => {
      if(res !== undefined){
        this.res = res.value;
      }
    });
  }

  isChecked(event: Event, id: number, namjena: 0 | 1): void {
    if(namjena === 0){
      if(id === 1) {
        if(this.val1 === 1){
          this.val1 = 0;
        }else{
        this.val1 = 1;
        }
      }
      if(id === 2) {
        if(this.val2 === 1){
          this.val2 = 0;
        }else{
        this.val2 = 1;
        }
      }
      if(id === 3) {
        if(this.val3 === 1){
          this.val3 = 0;
        }else{
        this.val3 = 1;
        }
      }
      if(id === 4) {
        if(this.val4 === 1){
          this.val4 = 0;
        }else{
        this.val4 = 1;
        }
      }
    }else {
      if(id === 1) {
        if(this.val1 === 2){
          this.val1 = 0;
        }else{
        this.val1 = 2;
        }
      }
      if(id === 2) {
        if(this.val2 === 2){
          this.val2 = 0;
        }else{
        this.val2 = 2;
        }
      }
      if(id === 3) {
        if(this.val3 === 2){
          this.val3 = 0;
        }else{
        this.val3 = 2;
        }
      }
      if(id === 4) {
        if(this.val4 === 2){
          this.val4 = 0;
        }else{
        this.val4 = 2;
        }
      }
    }

  }

  async trainIGeuss(): Promise<void> {

    this.category?.data.map(data => {

      let enterance = [];
      let exit = [];

      if(this.val1 === 1){
        enterance.push(data.value1);
      }else if(this.val1 === 2){
        exit.push(data.value1);
      }
      if(this.val2 === 1){
        enterance.push(data.value2);
      }else if(this.val2 === 2){
        exit.push(data.value2);
      }
      if(this.val3 === 1){
        enterance.push(data.value3);
      }else if(this.val3 === 2){
        exit.push(data.value3);
      }
      if(this.val4 === 1){
        enterance.push(data.value4);
      }else if(this.val4 === 2){
        exit.push(data.value4);
      }

      this.inputs.push(enterance);
      this.labels.push(exit);
    })

    await this.apiService.trainNetwork({
      inputs: this.inputs,
      labels: this.labels,
      epochs: this.epochs,
      nodes: this.arrayOfNodes
    }).then(res => {

      this.trained = true;
      this.trainingDone = true;

      setTimeout(() => {
        this.trained = false;
      }, 2000);
    }).catch(err => {
      console.log(err);
        this.error = true;

      setTimeout(() => {
        this.router.navigate(['/login']);

      }, 2000)
    });

    
  }

  changeNumberOfNodes(): void {
    this.arrayOfNodes = Array(this.numberOfLayers);
  }

  onChange(event: Event) {

    if((Number(this.input1) === 0 || Number(this.input1) === 1) && (Number(this.input2) === 0 || Number(this.input2) === 1)){
      this.valid = true;
      console.log(this.input1 + "\t" + this.input2 + "\t" + true)
    }else {

      console.log(this.input1 + "\t" + this.input2 + "\t" + false)
      this.valid = false;
    }

  }

  ngOnInit(): void {
  }

  fetchCategory(categoryId: number): void {
    this.apiService.fetchCategory(categoryId).then(res => {

      this.setCategory(res);

    }).catch(err => {

      if(err.status === 403) {

        this.loginService.refreshToken().then(res => {

          window.localStorage.setItem("access_token", res.access_token);
          window.localStorage.setItem("refresh_token", res.refresh_token);

          this.fetchCategory(this.catId);    
            
        }).catch(err => {

        this.router.navigate(['/login']);
        });
      }
    });
  }
  

  private setCategory(category: Category) {

    this.category = {
      categoryId: category.categoryId,
      name: category.name,
      excerpt: category.excerpt,
      value1: category.value1,
      value2: category.value2,
      value3: category.value3,
      value4: category.value4,
      value5: category.value5,
      value6: category.value6,
      value7: category.value7,
      data: []
    }

    category.data.map((data: Data) => {
      this.category?.data.push(
        {
          dataId: data.dataId,
          value1: data.value1,
          value2: data.value2,
          value3: data.value3,
          value4: data.value4,
          value5: data.value5,
          value6: data.value6,
          value7: data.value7,
          createdAt: data.createdAt
      }
      )
    });

}

logout(): void {
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');
  window.localStorage.clear();

  this.router.navigate(['/login']);
}
}
