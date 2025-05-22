import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CidadeBr } from "../models/cidade-br.model";
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  constructor(private httpclient: HttpClient) {}

  getEstadosBr() {
    return this.httpclient.get<any[]>('assets/Estadosbr.json');
  }

 
  getCidadesBr(idEstado: number) {
    return this.httpclient.get<any[]>(`assets/cidades.json`)
    .pipe(
        map((cidades: CidadeBr[]) => {
            const cidadesFiltradas = cidades.filter(cidade => cidade.estado == idEstado);
            console.log(`DropdownService: Cidades filtradas para ID ${idEstado}:`, cidadesFiltradas); 
            return cidadesFiltradas;
        })
    );
  }

  getCargos() {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev PL'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev SR'}
    ]
  }

  getTecnologias() {
    return [
      {nome: 'Java', desc: 'Java'},
      {nome: 'Javascript', desc: 'Js'},
      {nome: 'typescript', desc: 'ts'},
      {nome: 'python', desc: 'py'},
      {nome: 'csharp', desc: 'c#'},
    ]
  }

  getNewsletter() {
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ]
  }
}