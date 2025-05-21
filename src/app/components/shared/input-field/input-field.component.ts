import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, FormControl,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ErrorMsgComponent } from '../error-msg/error-msg.component'; 



@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'], 
  providers: [],
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    ErrorMsgComponent 
  ]
})
export class InputFieldComponent{
    
  @Input() classeCss: string = '';
  @Input() label: string = '';
  
  @Input() control!: FormControl; 

constructor() {

}

}
  

 

  

  


  

  

