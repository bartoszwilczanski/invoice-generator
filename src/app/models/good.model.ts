export class Good {
  id: number = 0;
  name: string = '';
  count: number = 0;
  price: number = 0;
  createdAt: string = '';
  updatedAt: string = '';
  companyId: number = 0;

  constructor(good: any) {
    Object.assign(this, good);
  }
}
