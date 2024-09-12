import { Component } from '@angular/core';
import { Good, GoodsService } from '../services/goods.service';
import { GoodsListComponent } from '../shared/goods-list/goods-list.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { createGood, getFieldErrors as getFieldErrors2 } from './goods.utils';

@Component({
  selector: 'app-goods',
  standalone: true,
  imports: [GoodsListComponent, ReactiveFormsModule],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.css',
  providers: [GoodsService],
})
export class GoodsComponent {
  goodsForm!: FormGroup;

  fields = ['name', 'count', 'price'];

  constructor(
    private goodsService: GoodsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.onDelete = this.onDelete.bind(this);
  }

  goods: Good[] = [];

  ngOnInit() {
    this.goodsForm = createGood(this.fb);
    this.loadGoods();
  }

  onSubmit(): void {
    if (this.isEmptyForm()) {
      alert('Please add items');
      return;
    }

    if (this.goodsForm.valid) {
      this.goodsService
        .addGood({
          ...this.goodsForm.value,
          companyId: 1,
        })
        .subscribe({
          next: (response) => {
            this.router.navigate([`/company/${response.companyId}`]);
          },
        });
    }
  }

  loadGoods() {
    this.goodsService.getAll().subscribe({
      next: (goods) => (this.goods = goods),
    });
  }

  onDelete(id: number): void {
    alert('You are removing the element.');

    this.goodsService.deleteGood(id).subscribe(() => {
      this.loadGoods();
    });
  }

  isEmptyForm(): boolean {
    for (let field in this.goodsForm.value) {
      if (this.goodsForm.value[field] !== '') {
        return false;
      }
    }
    return true;
  }

  getFieldErrors(field: string) {
    return getFieldErrors2(this.goodsForm, field);
  }
}
