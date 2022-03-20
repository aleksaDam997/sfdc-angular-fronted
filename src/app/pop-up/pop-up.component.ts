import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  public done: boolean = false;
  public addCatForm: FormGroup;
  name: string = '';
  excerpt: string = '';

  public message: string ='';
  public messageState: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private formBuilder: FormBuilder,
  private apiService: ApiService, private dialogRef: MatDialogRef<PopUpComponent>) {

    

    this.addCatForm = this.formBuilder.group({
      'name': [this.name, Validators.required],
      'excerpt': [this.excerpt, Validators.required],
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

      this.messageState = true;
      this.message = "Uspjesno ste unijeli novu kategoriju";
     
      setTimeout(() => {
        this.messageState = false;
        this.message = '';
      }, 1500);

    }).catch(err => {
      console.log(err);
    });

    setTimeout(() => {
      this.dialogRef.close();
    }, 1500);
    
      
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
