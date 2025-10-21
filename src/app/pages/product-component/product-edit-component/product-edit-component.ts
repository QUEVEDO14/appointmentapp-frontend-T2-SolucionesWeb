
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product-service';
import { CategoryService } from '../../../services/category-service';
import { FamilyService } from '../../../services/family-service';
import { LaboratoryService } from '../../../services/laboratory-service';
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

  categories: any[] = [];
  families: any[] = [];
  laboratories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private familyService: FamilyService,
    private laboratoryService: LaboratoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idProduct: [null],
      nameProduct: ['', [Validators.required, Validators.minLength(3)]],
      descriptionProduct: ['', Validators.required],
      presentationProduct: [''],
      unitPriceProduct: [0, [Validators.required, Validators.min(0.01)]],
      stockProduct: [0, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      family: [null, Validators.required],
      laboratory: [null, Validators.required],
    });

    this.loadCombos();

    this.route.params.subscribe((params) => {
      this.id = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.id;
      if (this.isEdit && this.id) {
        this.productService.findById(this.id).subscribe((data) => this.form.patchValue(data));
      }
    });
  }

  loadCombos() {
    this.categoryService.findAll().subscribe(data => (this.categories = data));
    this.familyService.findAll().subscribe(data => (this.families = data));
    this.laboratoryService.findAll().subscribe(data => (this.laboratories = data));
  }

  persist() {
    if (this.form.invalid) return;

    const product: Product = this.form.value;

    if (this.isEdit && this.id) {
      this.productService.update(this.id, product).pipe(
        switchMap(() => this.productService.findAll())
      ).subscribe(data => {
        this.productService.setProductChange(data);
        this.productService.setMessageChange('PRODUCTO ACTUALIZADO');
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.save(product).pipe(
        switchMap(() => this.productService.findAll())
      ).subscribe(data => {
        this.productService.setProductChange(data);
        this.productService.setMessageChange('PRODUCTO CREADO');
        this.router.navigate(['/products']);
      });
    }
  }
}
