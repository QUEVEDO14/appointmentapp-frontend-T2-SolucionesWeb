import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})

// http://locahost:9090/patients
// http://localhost:9090/medic

export class PatientService {

  constructor (private http: HttpClient){}

  private url: string =  `${environment.HOST}/patients`; 

  findAll(){
    // return this.http.get(this.url);
    return this.http.get<Patient[]>(this.url);
  }
}
