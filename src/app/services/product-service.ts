import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = `${environment.HOST}/products`;
  private productChange: Subject<Product[]> = new Subject<Product[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}


  findAll() {
    return this.http.get<Product[]>(this.url);
  }

  findById(id: number) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  save(product: Product) {
    return this.http.post(this.url, product);
  }

  update(id: number, product: Product) {
    return this.http.put(`${this.url}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setProductChange(data: Product[]) {
    this.productChange.next(data);
  }

  getProductChange() {
    return this.productChange.asObservable();
  }

  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
