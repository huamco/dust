import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import { CompanyComponent } from './company/company.component';
import {UserComponent} from './user/user.component';
import {HttpClientModule} from '@angular/common/http';
import { UserinfoComponent } from './user/userinfo/userinfo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CompanyInfoComponent } from './company/company-info/company-info.component';

export const routes = [
    { path: 'users', component: UserComponent, data: { breadcrumb: 'User' } },
    { path: 'company', component: CompanyComponent, data: { breadcrumb: 'Company' } },
];

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      RouterModule.forChild(routes),
      NgxDatatableModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule
  ],
    declarations: [
        UserComponent,
        CompanyComponent,
        UserinfoComponent,
        CompanyInfoComponent
    ],
    entryComponents:[
        UserinfoComponent,
        CompanyInfoComponent
    ],
    providers: [
    ]
})
export class AdminModule { }
