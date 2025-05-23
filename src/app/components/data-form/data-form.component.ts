import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDebugComponent } from "../shared/form-debug/form-debug.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { FormValidations } from '../shared/form-validation';
import { VerificaEmailService } from './services/verifica-email.service';
import { ErrorMsgComponent } from '../shared/error-msg/error-msg.component';
import { switchMap } from 'rxjs/operators';
import { InputFieldComponent } from '../shared/input-field/input-field.component';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-data-form',
  imports: [ReactiveFormsModule, FormDebugComponent, CommonModule, ErrorMsgComponent, InputFieldComponent],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css',
  standalone: true
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
   

  estados!: EstadoBr[];
  cidades: any[] = [];
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp: any[] = [];

  frameworks = ['Angular', 'React', 'VueJS'];

  

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super(); 
  }

  
  override ngOnInit() { 

    this.dropdownService.getEstadosBr()
      .subscribe(dados => { this.estados = dados; console.log(dados) });

    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();

    
    this.verificaEmailService.verificarEmail('').subscribe();

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")], [this.validarEmailCustom.bind(this)]], 
      confirmarEmail: [null, [Validators.required, FormValidations.equalsTO('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null,],
        estado: [null, Validators.required],
      }),
      cargo: [null, Validators.required],
      tecnologias: [null, Validators.required],
      newsletter: [null],
      termos: [false, Validators.requiredTrue],
      frameworks: this.formBuilder.array(
        this.buildFrameworks(),
        FormValidations.requiredMinCheckbox(1))
    });

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status Cep', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService!.consultaCEP(this.formulario.get('endereco.cep')?.value)
          : scheduled(of(null), asyncScheduler)
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});


this.formulario.get('endereco.estado')?.valueChanges
  .pipe(
    tap(estado => {
      console.log('Novo estado selecionado', estado);
      this.formulario.get('endereco.cidade')?.setValue(null);
      this.cidades = [];
    }),
    map(estadoSigla => this.estados.find(e => e.sigla === estadoSigla)),
    map(estadoObj => estadoObj ? estadoObj.id : null),
    switchMap((estadoId: number | null) => {
      if (estadoId !== null) {
        return this.dropdownService.getCidadesBr(estadoId); 
      } else {
        return EMPTY;
      }
    }),
    tap(cidades => console.log('DataFormComponent: Cidades recebidas e prontas para atribuição:', cidades))
  )
  .subscribe(cidades => this.cidades = cidades);
    
       //this.dropdownService.getCidadesBr(8).subscribe(console.log);
  }

  buildFrameworks() {
    return this.frameworks.map(() => new FormControl(false));
  }

  
  override submit(): void { 
    let valueSubmit = Object.assign({}, this.formulario.value);
    const frameworksArray = valueSubmit.frameworks || [];
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: frameworksArray
        .map((v: any, i: number) => (v ? this.frameworks[i] : null))
        .filter((v: any) => v !== null)
    });
    console.log(valueSubmit);
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe((dados: any) => console.log(dados));
  }

  
  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;
    if (cep && /^[0-9]{8}$/.test(cep)) {
      this.cepService.consultaCEP(cep)
        ?.subscribe((dados: any) => this.populaDadosForm(dados));
    }
  }

 
  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro || '',
        bairro: dados.bairro || '',
        cidade: dados.localidade || '',
        estado: dados.uf || ''
      }
    });

 
    this.formulario.get('nome')?.setValue('Felipe Gonçalves');
    this.formulario.get('email')?.setValue('soares@gmail.com');
    this.formulario.get('confirmarEmail')?.setValue('soares@gmail.com');
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev PL' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.nome === obj2.nome && obj1.nivel === obj2.nivel : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['Java', 'typescript']);
  }

  
  validarEmailCustom(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(
        map((emailExistente: any) => (emailExistente ? { emailInvalido: true } : null))
      );
  }

  getFrameworksControls() {
    return (this.formulario.get('frameworks') as FormArray).controls;
  }

 

}


