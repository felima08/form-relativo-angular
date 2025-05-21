import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidations } from '../form-validation';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg-component.html',
  imports: [CommonModule],
  standalone:true,
})
export class ErrorMsgComponent implements OnInit {

  @Input() control!: AbstractControl | null;
  @Input() label!: string;

  

  constructor() { }

  ngOnInit() {
    
  }

  get errorMessage() {
    
   for(const propertyName in this.control?.errors){
    if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
      console.log(`[ErrorMsgComponent - ${this.label}] Sem controle ou sem erros. Retornando null.`);
      return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
    }
   }
   
    return null
  }
}