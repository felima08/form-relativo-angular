import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Directive()
export abstract class BaseFormComponent implements OnInit {
  formulario: any;

 

  constructor() { }

  ngOnInit() {
  }
  

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  

 

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }


}