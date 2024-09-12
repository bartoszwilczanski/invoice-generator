import { Component, Input } from '@angular/core';
import { Good } from '../../services/goods.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapEye, bootstrapTrash } from '@ng-icons//bootstrap-icons';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'goods-list',
  standalone: true,
  imports: [
    NgIconComponent,
    RouterLink,
    NgIf,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  viewProviders: [provideIcons({ bootstrapEye, bootstrapTrash })],
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
