import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../user/user.model';
import * as moment from 'moment';
import {CompanyService} from '../../company/company.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
    providers: [ CompanyService ]
})
export class UserinfoComponent implements OnInit {
    public form: FormGroup;
    public passwordHide: boolean = true;
    companies: any[] = [];
    selectedCompany: any;

    constructor(public dialogRef: MatDialogRef<UserinfoComponent>,
                @Inject(MAT_DIALOG_DATA) public user: User,
                public fb: FormBuilder,
                public companyService: CompanyService
                ) {
        this.form = this.fb.group({
            id: null,
            username: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            name: [null, Validators.compose([Validators.required])],
            email: [null, Validators.compose([Validators.required])],
            companyId: null /*[null, Validators.compose([Validators.required])]*/,
            position: null,
            tel: null,
            startDate: null /*moment.parseZone(new Date()).format('yyyy-MM-dd')*/,
            endDate: null /*new Date().setDate(new Date().getDate() + 30)*/,
            isAdmin: 0,
            isManager: 0,
            isWorker: 0,
            isDemo: 0,
        });
    }

    ngOnInit() {
        if (!this.user) {
            this.user = new User();
        }
        this.getCompanies();
    }

    getCompanies() {
        this.companyService.getCompany().subscribe(companies => {
            companies.forEach((x) => {
                this.companies.push({
                    id: x.id,
                    text: x.name
                });
            });
            if (this.user) {
                this.form.controls['id'].setValue(this.user.id);
                this.form.controls['username'].setValue(this.user.username);
                this.form.controls['password'].setValue(this.user.password);
                this.form.controls['name'].setValue(this.user.name);
                this.form.controls['email'].setValue(this.user.email);
                //this.form.controls['companyId'].setValue(this.user.companyId);
                this.form.controls['tel'].setValue(this.user.tel);
                this.form.controls['position'].setValue(this.user.position);
                this.form.controls['isAdmin'].setValue(this.user.isAdmin);
                this.form.controls['isManager'].setValue(this.user.isManager);
                this.form.controls['isWorker'].setValue(this.user.isWorker);
                this.form.controls['isDemo'].setValue(this.user.isDemo);
                this.form.controls['startDate'].setValue(this.user.startDate);
                this.form.controls['endDate'].setValue(this.user.endDate);
                this.selectedCompany = this.user.companyId;
                // this.form.setValue(this.user)
                // this.selectedCompanies();
               this.selectedCompany = this.companies.filter((c)=>{
                    return c.text === this.user.companyId;
                })[0];
            }
            // else {
            //     this.user = new User();
            // }
        });
    }

    selectedCompanies() {
        this.selectedCompany = _.find(this.companies, { 'id': this.form.controls['companyId'].value }).text;
    }

    close(): void {
        this.dialogRef.close();
    }

}
