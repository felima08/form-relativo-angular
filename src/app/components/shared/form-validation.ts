import { FormArray, FormControl, FormGroup, AbstractControl } from '@angular/forms';

export class FormValidations {

 static requiredMinCheckbox(min = 1) {
  return (control: AbstractControl) => {
    const formArray = control as FormArray;
    const totalChecked = formArray.controls
      .map(v => v.value)
      .reduce((total, current) => current ? total + 1 : total, 0);
    return totalChecked >= min ? null : { required: true };
  };
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !=='') {
      const validacep = /^[0-9]{5}-?[0-9]{3}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }
static equalsTO(otherField: string) {
  return (control: AbstractControl) => {
    if (otherField == null) {
      throw new Error('Campo não informado');
    }
    const formGroup = control.parent as FormGroup;
    if (!formGroup) return null;
    const field = formGroup.get(otherField);
    if (!field) {
      throw new Error('Campo para comparação não encontrado');
    }
    if (field.value !== control.value) {
      return { equalsTo: otherField };
    }
    return null;
  };
}


 static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      'required': `${fieldName} é obrigatório.`,
      'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      'cepInvalido': 'CEP inválido.',
      'emailInvalido': 'Email já cadastrado!',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido'
    };
     
    
  }


}
