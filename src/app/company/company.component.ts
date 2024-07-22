import { Component, inject } from '@angular/core';
import { Company, CompanyService } from '../services/company.service';
import { Good, GoodsService } from '../services/goods.service';
import { GoodsListComponent } from '../shared/goods-list/goods-list.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [GoodsListComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  private companyService = inject(CompanyService);
  private goodsService = inject(GoodsService);

  private routeSub!: Subscription;

  companyId?: string

  constructor(private route: ActivatedRoute) { }

  company?: Company;
  goods: Good[] = []

  ngOnInit() {

    this.companyService.getCompany().subscribe({
      next: (company) => {
        this.company = company.body!

        this.routeSub = this.route.params.subscribe(params => {
          this.companyId = params['companyId']

          if (params['companyId']) {

            this.goodsService.getAll().subscribe({
              next: (goods) => this.goods = goods
            })
          }
        })
      },
    })
  }

  goodsSummary() {
    let sum = 0
    for (const item of this.goods) {
      sum += item.count * item.price
    }
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
