import { Category } from './category';
import { Family } from './family';
import { Laboratory } from './laboratory';

export class Product {
  idProduct!: number;
  nameProduct!: string;
  descriptionProduct!: string;
  presentationProduct?: string;
  unitPriceProduct!: number;
  stockProduct!: number;
  expiredProduct?: string; // ISO date
  category!: Category;
  family!: Family;
  laboratory!: Laboratory;
}
