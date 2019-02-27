import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Company} from '../company.model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

    public form: FormGroup;

    constructor(public dialogRef: MatDialogRef<CompanyInfoComponent>,
                @Inject(MAT_DIALOG_DATA) public company: Company,
                public fb: FormBuilder) {
        this.form = this.fb.group({
            id: null,
            name: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            /*code: [null, Validators.compose([Validators.required])],
            serialNo: null,*/
            address1: null,
            address2: null,
            zipcode1: null,
            tel: null,
            fax: null,
            isActive: 0,
            monitoringType: 1
        });
    }

    ngOnInit() {
        if (this.company) {
            this.form.controls['id'].setValue(this.company.id);
            this.form.controls['name'].setValue(this.company.name);
            /*this.form.controls['code'].setValue(this.company.code);
            this.form.controls['serialNo'].setValue(this.company.serialNo);*/
            this.form.controls['address1'].setValue(this.company.address1);
            this.form.controls['address2'].setValue(this.company.address2);
            this.form.controls['zipcode1'].setValue(this.company.zipcode1);
            this.form.controls['tel'].setValue(this.company.tel);
            this.form.controls['fax'].setValue(this.company.fax);
            this.form.controls['isActive'].setValue(this.company.isActive);
            this.form.controls['monitoringType'].setValue(this.company.monitoringType);
            /*this.form.setValue(this.company);*/
        }
        else {
            this.company = new Company();
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
