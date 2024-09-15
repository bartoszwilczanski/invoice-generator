export class Company {
  id: number = 0;
  name: string = '';
  address: string = '';
  email: string = '';
  phone: string = '';
  about: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(company: any) {
    Object.assign(this, company);
  }
}
