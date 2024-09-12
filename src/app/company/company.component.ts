import { Component } from '@angular/core';
import { Company, CompanyService } from '../services/company.service';
import { Good, GoodsService } from '../services/goods.service';
import { GoodsListComponent } from '../shared/goods-list/goods-list.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PhoneFormatPipe } from '../utils/pipes/PhoneFormatPipe';

const SUM_REGEX = /\B(?=(\d{3})+(?!\d))/g;

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [PhoneFormatPipe, GoodsListComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  private routeSub!: Subscription;

  companyId?: string;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private goodsService: GoodsService
  ) {}

  company?: Company;
  goods: Good[] = [];

  ngOnInit() {
    this.companyService.getCompany().subscribe({
      next: (company) => {
        this.company = company;

        this.routeSub = this.route.params.subscribe((params) => {
          this.companyId = params['companyId'];

          if (params['companyId']) {
            this.goodsService.getAll().subscribe({
              next: (goods) => (this.goods = goods),
            });
          }
        });
      },
    });
  }

  goodsSummary() {
    let sum = 0;
    for (const item of this.goods) {
      sum += item.count * item.price;
    }
    return sum.toString().replace(SUM_REGEX, ',');
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
