import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

export type Good = {
    "id": number;
    "name": string;
    "count": number;
    "price": number;
    "createdAt": string;
    "updatedAt": string;
    "companyId": number;
}

@Injectable({ providedIn: 'root' })
export class GoodsService {
    private URL = "http://localhost:3000";

    private http = inject(HttpClient);

    getAll() {
        return this.http.get<Good[]>(`${this.URL}/goods`, {
            observe: "response",
        }).pipe(map(res => res.body!))
    }

    addGood(body: Pick<Good, 'name' | 'count' | 'price' | 'companyId'>) {
        return this.http.post<Omit<Good, 'id'>>(`${this.URL}/goods`, body)
    }

    deleteGood(id: number) {
        return this.http.delete(`${this.URL}/goods/${id}`)
    }
}