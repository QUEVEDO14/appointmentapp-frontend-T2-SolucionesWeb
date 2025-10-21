import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = `${environment.HOST}/categories`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  findById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }
}
