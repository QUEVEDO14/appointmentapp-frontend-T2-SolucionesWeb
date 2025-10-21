import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './product-edit-component.html',
  styleUrls: ['./product-edit-component.css'],
})
export class ProductEditComponent {
  form!: FormGroup;
  id!: number | null;
  isEdit = false;

  categories = [
    { idCategory: 1, nameCategory: 'Medicamentos' },
    { idCategory: 2, nameCategory: 'Vitaminas' },
    { idCategory: 3, nameCategory: 'Analgésicos' },
  ];

  families = [
    { idFamily: 1, nameFamily: 'Tabletas' },
    { idFamily: 2, nameFamily: 'Jarabes' },
    { idFamily: 3, nameFamily: 'Inyectables' },
  ];

  laboratories = [
    { idLaboratory: 1, nameLaboratory: 'Roche' },
    { idLaboratory: 2, nameLaboratory: 'Bayer' },
    { idLaboratory: 3, nameLaboratory: 'Pfizer' },
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      idProduct: new FormControl(null),
      nameProduct: new FormControl('', [Validators.required, Validators.minLength(3)]),
      unitPriceProduct: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      stockProduct: new FormControl(0, [Validators.required, Validators.min(0)]),
      category: new FormControl(null, Validators.required),
      family: new FormControl(null, Validators.required),
      laboratory: new FormControl(null, Validators.required),
    });

    // Leer param id (edit / new)
    this.route.params.subscribe((params) => {
      this.id = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.id;
      if (this.isEdit && this.id) {
        this.productService.findById(this.id).subscribe((data) => {
          // el backend devuelve category/family/laboratory como objetos; patchValue funciona bien
          this.form.patchValue(data);
        });
      }
    });
  }

  persist() {
    if (this.form.invalid) return;

    const product: Product = this.form.value;

    if (this.isEdit && this.id) {
      this.productService.update(this.id, product).pipe(
        switchMap(() => this.productService.findAll())
      ).subscribe((data) => {
        this.productService.setProductChange(data);
        this.productService.setMessageChange('PRODUCTO ACTUALIZADO');
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.save(product).pipe(
        switchMap(() => this.productService.findAll())
      ).subscribe((data) => {
        this.productService.setProductChange(data);
        this.productService.setMessageChange('PRODUCTO CREADO');
        this.router.navigate(['/products']);
      });
    }
  }
}
