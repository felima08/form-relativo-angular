import { Directive, OnInit } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms'; 

@Directive()
export abstract class BaseFormComponent implements OnInit {
  formulario!: FormGroup; 

  constructor() { }

  ngOnInit() { } 


  abstract submit(): void; 

  
  onSubmit() {
    if (this.formulario.valid) {
      this.submit(); 
    } else {
      console.log('Formulário inválido');
      this.verificaValidacoesForm(this.formulario); 
    }
  }

  
  verificaValidacoesForm(formGroup: FormGroup | FormArray) { 
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo); 

      controle?.markAsDirty(); 
      controle?.markAsTouched();

      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle); 
      }
    });
  }

  Resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string): boolean {
    const control = this.formulario.get(campo);
    return (control?.invalid && (control?.touched || control?.dirty)) || false;
  }

 aplicaCssErro(campo: string): { [key: string]: boolean } {
  const isValidTouched = this.verificaValidTouched(campo);
  return {
    'is-invalid': isValidTouched, 
    'has-feedback': isValidTouched 
  };
}

  
  getCampo(campo: string): AbstractControl | null { 
    return this.formulario.get(campo);
  }
}