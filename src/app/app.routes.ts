import { Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { GoodsComponent } from './goods/goods.component';

export const routes: Routes = [
    {
        path: "",
        component: GoodsComponent,
        title: "List of goods",
    },
    {
        path: "company",
        title: "Company",
        children: [
            {
                path: "",
                component: CompanyComponent,
            },
            {
                path: ":companyId",
                component: CompanyComponent,
            },
        ],
    },
];
