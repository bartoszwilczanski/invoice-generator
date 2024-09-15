import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCompany(): Observable<Company> {
    return this.http
      .get<Company>(`${this.URL}/company`)
      .pipe(map((data: any) => new Company(data)));
  }
}
