import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoodsService } from '../../../services/goods.service';
import { createFieldErrors, createGood } from '../../goods.utils';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'goods-form-dialog.component.html',
  styleUrl: './goods-form-dialog.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
  ],
})
export class GoodsFormDialog {
  goodsForm!: FormGroup;
  fields = ['name', 'count', 'price'];

  constructor(
    private router: Router,
    private goodsService: GoodsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GoodsFormDialog>
  ) {
    this.goodsForm = createGood(this.fb);
  }

  onClose(): void {
    this.dialogRef.close();
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
            this.onClose();
            this.router.navigate([`/company/${response.companyId}`]);
          },
        });
    } else {
      this.goodsForm.markAllAsTouched();
    }
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
    return createFieldErrors(this.goodsForm, field);
  }
}
