import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http:HttpClient) { }

consultaCEP(cep: string) {
  if (cep && cep !== "") {
    const validarcep = /^[0-9]{8}$/;

    if (validarcep.test(cep)) {
      
      return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
    }
  }
  return null;
}
}
