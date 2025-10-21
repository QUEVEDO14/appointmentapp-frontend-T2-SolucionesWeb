import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Family } from '../model/family';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private url: string = `${environment.HOST}/families`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Family[]> {
    return this.http.get<Family[]>(this.url);
  }

  findById(id: number): Observable<Family> {
    return this.http.get<Family>(`${this.url}/${id}`);
  }
}
