import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, FormControl,ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ErrorMsgComponent } from '../error-msg/error-msg.component'; 
import { FormsModule } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'], 
  providers: [INPUT_FIELD_VALUE_ACCESSOR],
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    ErrorMsgComponent,
    FormsModule
  ]
})
export class InputFieldComponent implements ControlValueAccessor {
    
  @Input() classeCss: string | { [key: string]: boolean } = '';
  @Input() id: string = '';
  @Input() type = 'text';
  @Input() label: string = '';
  
  @Input() control!: AbstractControl | null;
  
  @Input() isReadOnly: any;


private innerValue: any

get value() {
  return this.innerValue;
}

set value(v:any){
  if(v !== this.innerValue){
  this.innerValue = v;
  this.onChangeCb(v);
  }
}

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

   writeValue(v: any): void {
    this.innerValue = v;
  }


  registerOnChange(fn: any): void {
   this.onChangeCb= fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
   this.isReadOnly = isDisabled;
  }
 
}
  

 

  

  


  

  

