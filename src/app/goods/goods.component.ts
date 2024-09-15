import { GoodsService } from '../services/goods.service';
import { GoodsListComponent } from '../shared/goods-list/goods-list.component';

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Good } from '../models/good.model';
import { GoodsFormDialog } from './components/dialog/goods-form-dialog.component';

@Component({
  selector: 'app-goods',
  standalone: true,
  imports: [GoodsListComponent, MatIconModule],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss',
  providers: [GoodsService],
})
export class GoodsComponent {
  constructor(private goodsService: GoodsService, public dialog: MatDialog) {
    this.onDelete = this.onDelete.bind(this);
  }

  goods: Good[] = [];

  ngOnInit() {
    this.loadGoods();
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

  openDialog(): void {
    this.dialog.open(GoodsFormDialog, {
      width: '400px',
      data: {},
      autoFocus: false,
    });
  }
}
