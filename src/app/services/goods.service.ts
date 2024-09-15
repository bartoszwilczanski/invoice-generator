import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Good } from '../models/good.model';

@Injectable({ providedIn: 'root' })
export class GoodsService {
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Good[]> {
    return this.http
      .get<Good[]>(`${this.URL}/goods`)
      .pipe(map((data: any[]) => data.map((item) => new Good(item))));
  }

  addGood(
    body: Pick<Good, 'name' | 'count' | 'price' | 'companyId'>
  ): Observable<Good> {
    return this.http
      .post<Good>(`${this.URL}/goods`, body)
      .pipe(map((data: any) => new Good(data)));
  }

  deleteGood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/goods/${id}`);
  }
}
