import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../company/company.service';
import {MatDialog} from '@angular/material';
import {Settings} from '../../../app.settings.model';
import {Company} from './company.model';
import {CompanyInfoComponent} from './company-info/company-info.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
    providers: [ CompanyService ]
})
export class CompanyComponent implements OnInit {

    public displayedColumns = ['name', 'address', 'tel', 'isActive', 'delete', 'edit'];
    public dataSource: any;
    public settings: Settings;
    public company: Company[];
    dialogRef: any;
    constructor(public dialog: MatDialog,
                public companyService: CompanyService) { }

    ngOnInit() {
        this.getCompany();
    }

    public getCompany(): void {
        this.company = null; //for show spinner each time
        this.companyService.getCompany().subscribe(company => {
            this.company = company;
            this.dataSource = this.company;
        });
    }
    public addCompany(company: Company) {
        this.companyService.addCompany(company).subscribe(company => this.getCompany());
    }
    public updateCompany(company: Company) {
        console.log('updateCompany');
        this.companyService.updateCompany(company, company.id).subscribe(company => this.getCompany());
    }
    public deleteCompany(company: Company) {
        this.companyService.deleteCompany(company.id).subscribe(company => this.getCompany());
    }

    public openCompanyDialog(company) {
        this.dialogRef = this.dialog.open(CompanyInfoComponent, {
            data: company
        });

        this.dialogRef.afterClosed().subscribe(company => {
            console.log(company);
            if (company) {
                (company.id) ? this.updateCompany(company) : this.addCompany(company);
            }
        });
    }

}
