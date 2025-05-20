import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidations } from '../form-validation';


@Component({
  selector: 'app-error-msg',
  template: "",
  standalone:true,
})
export class ErrorMsgComponent implements OnInit {

  @Input() control!: AbstractControl | null;
  @Input() mlabel!: string;

  

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {
   for(const propertyName in this.control?.errors){
    if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
      return FormValidations.getErrorMsg(this.mlabel, propertyName, this.control.errors[propertyName])
    }
   }
   
    return null
  }
}