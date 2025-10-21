import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Laboratory } from '../model/laboratory';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {
  private url: string = `${environment.HOST}/laboratories`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(this.url);
  }

  findById(id: number): Observable<Laboratory> {
    return this.http.get<Laboratory>(`${this.url}/${id}`);
  }
}
