import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product-component/product-component';
import { ProductEditComponent } from './pages/product-component/product-edit-component/product-edit-component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    children: [
      { path: '', component: ProductComponent },
      { path: 'new', component: ProductEditComponent },
      { path: 'edit/:id', component: ProductEditComponent },
    ],
  },
];
