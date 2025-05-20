import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) { }

 verificarEmail(email: string) {
   return this.http.get(`assets/verificarEmail.json`)
   
   .pipe(
    delay(3000),
   map((dados: any) => dados.emails),
   
   map((dados: any) => dados.filter((v: { email: string }) => v.email === email)),
   map((dados: any[]) => dados.length > 0 )

   );
 }
 

}

