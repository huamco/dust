import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company.model';

@Injectable()
export class CompanyService {
    public url = 'http://localhost:3300/company';
    constructor(public http: HttpClient) { }

    getCompany(): Observable<Company[]> {
        return this.http.get<Company[]>(this.url);
    }

    addCompany(company: Company) {
        return this.http.post(this.url, company);
    }

    updateCompany(company: Company) {
        return this.http.put(this.url, company);
    }

    deleteCompany(id: number) {
        return this.http.delete(this.url + "/" + id);
    }
}
