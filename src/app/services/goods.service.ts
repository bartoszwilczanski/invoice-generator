import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Good = {
  id: number;
  name: string;
  count: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  companyId: number;
};

@Injectable({ providedIn: 'root' })
export class GoodsService {
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Good[]> {
    return this.http.get<Good[]>(`${this.URL}/goods`);
  }

  addGood(
    body: Pick<Good, 'name' | 'count' | 'price' | 'companyId'>
  ): Observable<Good> {
    return this.http.post<Good>(`${this.URL}/goods`, body);
  }

  deleteGood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/goods/${id}`);
  }
}
