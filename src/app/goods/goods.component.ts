import { Component, inject } from '@angular/core';
import { Good, GoodsService } from '../services/goods.service';
import { GoodsListComponent } from '../shared/goods-list/goods-list.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidationLabels } from './goods.constant';
import { IntegerValidator } from '../utils/validators';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-goods',
  standalone: true,
  imports: [GoodsListComponent, ReactiveFormsModule],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.css'
})
export class GoodsComponent {

  private goodsService = inject(GoodsService);

  goodsForm!: FormGroup;

  fields = ['name', 'count', 'price']

  constructor(private fb: FormBuilder, private router: Router) { }

  goods: Good[] = []


  ngOnInit() {

    this.goodsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      count: ['', [Validators.required, Validators.min(1), Validators.max(100), IntegerValidator()]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(1000000), IntegerValidator()]]
    });

    this.loadGoods();
  }

  onSubmit(): void {

    if (this.isEmptyForm()) {
      alert('Please add items')
      return
    }


    if (this.goodsForm.valid) {
      this.goodsService.addGood({
        ...this.goodsForm.value,
        companyId: 1
      }).subscribe({
        next: (response) => {
          this.router.navigate([`/company/${response.companyId}`]);

        },
      });
    }
  }

  onDelete(id: number) {

    alert('You are removing the element.')

    this.goodsService.deleteGood(id).pipe(
      switchMap(() => {
        this.loadGoods()
        return []
      })
    ).subscribe();
  }

  loadGoods() {
    this.goodsService.getAll().subscribe({
      next: (goods) => this.goods = goods
    });
  }

  isEmptyForm(): boolean {
    for (let field in this.goodsForm.value) {
      if (this.goodsForm.value[field] !== '') {
        return false
      }
    }
    return true
  }

  getFieldErrors(field: string) {
    const currField = this.goodsForm.get(field)

    if (!(currField?.invalid && currField?.touched)) return ''

    const error = currField?.errors

    const fieldName = field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()

    const errorKey = Object.keys(error || {})[0]

    let errorValue = FormValidationLabels[errorKey as keyof typeof FormValidationLabels] as string

    if (errorValue) {
      errorValue = errorValue.replace('{x}', fieldName)

      if (errorKey === 'required') return errorValue;
      if (error) {
        if (errorKey === 'minlength' || errorKey === 'maxlength') {
          return errorValue.replace('{requiredLength}', error[errorKey].requiredLength)
        }
        if (errorKey === 'min' || errorKey === 'max') {
          return errorValue.replace(`{${errorKey}}`, error[errorKey][errorKey])
        }
      }

      return errorValue
    }

    return ''
  }

}
