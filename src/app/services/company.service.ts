import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Company = {
  name: string;
  address: string;
  email: string;
  phone: string;
  id: number;
  about: string;
  createdAt: string;
  updatedAt: string;
};

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCompany(): Observable<Company> {
    return this.http.get<Company>(`${this.URL}/company`);
  }
}
