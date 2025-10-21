import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { Product } from '../../model/product.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './product-component.html',
  styleUrls: ['./product-component.css'],
})
export class ProductComponent {
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = [
    'idProduct',
    'nameProduct',
    'unitPriceProduct',
    'stockProduct',
    'category',
    'family',
    'laboratory',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.productService.findAll().subscribe(data => this.createTable(data));
    this.productService.getProductChange().subscribe(data => this.createTable(data));
    this.productService.getMessageChange().subscribe(msg => {
      this._snackBar.open(msg, 'INFO', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    });
  }

  createTable(data: Product[]) {
    this.dataSource = new MatTableDataSource(data || []);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.delete(id)
        .pipe(switchMap(() => this.productService.findAll()))
        .subscribe(data => {
          this.productService.setProductChange(data);
          this.productService.setMessageChange('PRODUCTO ELIMINADO');
        });
    }
  }
}