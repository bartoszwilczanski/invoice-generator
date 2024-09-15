import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Good } from '../../models/good.model';

@Component({
  selector: 'goods-list',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './goods-list.component.html',
  styleUrl: './goods-list.component.scss',
})
export class GoodsListComponent {
  displayedColumns: string[] = ['name', 'price', 'count'];

  @Input() companyId?: string;

  @Input() goods: Good[] = [];

  @Input() onDelete: (id: number) => void = () => {};

  onDeleteItem(id: number): void {
    if (this.onDelete) this.onDelete(id);
    else {
      console.error('onDelete method is not defined');
    }
  }

  ngOnInit() {
    if (!this.companyId) {
      this.displayedColumns.push('view', 'delete');
    }
  }
}
