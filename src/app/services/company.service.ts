import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export type Company = {
    name: string;
    address: string;
    email: string;
    phone: string;
    id: number;
    about: string;
    createdAt: string;
    updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class CompanyService {
    private URL = "http://localhost:3000";

    private http = inject(HttpClient);

    getCompany() {
        return this.http.get<Company>(`${this.URL}/company`, {
            observe: "response",
        })
    }
}