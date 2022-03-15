import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Data } from '../dto/data.dto';
import { Cat } from '../dto/cat.dto';
import { Category } from '../dto/category.dto';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public categories: Cat[] = [];
  public category?: Category;

  public showSpinner: boolean = false;

  constructor(private apiService: ApiService, private loginService: LoginService, private router: Router) {
    this.fetchCategories();
   }

  ngOnInit(): void {
  }

  fetchCategories(): void {
    this.apiService.fetchCategories().then(res => {

      const cats: Cat[] = res;

      this.setCats(cats);

      
      this.fetchCategory(this.categories[0].categoryId);

    }).catch(err => {

      if(err.status === 403) {

        this.loginService.refreshToken().then(res => {

          window.localStorage.setItem("access_token", res.access_token);
          window.localStorage.setItem("refresh_token", res.refresh_token);

          this.apiService.fetchCategories().then(res => {

            const cats: Cat[] = res;
      
            this.setCats(cats);
          });
          
        }).catch(err => {
          if(err.status === 403) {
            this.router.navigate(['/login']);
          }
        })
      }
    });


  }

  fetchCategory(categoryId: number): void {
    this.apiService.fetchCategory(categoryId).then(res => {

      this.setCategory(res);
      console.log(this.category);
    });
  }

  private setCats(cats: Cat[]): void {
    cats.map((cat: Cat) => {
      this.categories.push({
        categoryId: cat.categoryId,
        name: cat.name,
        excerpt: cat.excerpt,
        current: false
    })
    })
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
  }
