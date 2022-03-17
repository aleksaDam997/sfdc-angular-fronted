import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  public done: boolean = false;
  public addCatForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private formBuilder: FormBuilder,
  private apiService: ApiService) {

    

    this.addCatForm = this.formBuilder.group({
      name: '',
      excerpt: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
    })
   }

  ngOnInit(): void {
  }

  saveCategory(data: any): void {
    const formToSend = {
      name: data.name,
      excerpt: data.excerpt,
      value1: data.value1,
      value2: data.value2,
      value3: data.value3,
      value4: data.value4,
      value5: data.value5,
      value6: data.value6,
      value7: data.value7
    }

    this.apiService.addCategory(formToSend).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  submitForm(data: any): void {
    console.log(data);
    console.log(this.addCatForm);

    const formToSend = {
      name: String(this.addCatForm.get('name')),
      excerpt: String(this.addCatForm.get('excerpt')),
      value1: String(this.addCatForm.get('value1')),
      value2: String(this.addCatForm.get('value2')),
      value3: String(this.addCatForm.get('value3')),
      value4: String(this.addCatForm.get('value4')),
      value5: String(this.addCatForm.get('value5')),
      value6: String(this.addCatForm.get('value6')),
      value7: String(this.addCatForm.get('value7'))
    }

    console.log(formToSend.name);
    console.log(data.name);
  }
}
