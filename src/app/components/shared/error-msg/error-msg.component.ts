import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-error-msg',
  template: "",
  standalone:true,
})
export class ErrorMsgComponent implements OnInit {

  @Input() msgErro!: string;
  @Input() mostrarErro!: boolean;

  

  constructor() { }

  ngOnInit() {
  }

}