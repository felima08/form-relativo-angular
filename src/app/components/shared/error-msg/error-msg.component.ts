import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';


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

}