import { Component, Input } from '@angular/core';
import { Good } from '../../services/goods.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapEye, bootstrapTrash } from '@ng-icons//bootstrap-icons'
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'goods-list',
  standalone: true,
  imports: [NgIconComponent, RouterLink, NgIf],
  templateUrl: './goods-list.component.html',
  styleUrl: './goods-list.component.css',
  viewProviders: [provideIcons({ bootstrapEye, bootstrapTrash })]
})

export class GoodsListComponent {

  @Input() companyId?: string

  @Input() goods: Good[] = []

  @Input() onDelete?: (id: number) => void;

}
