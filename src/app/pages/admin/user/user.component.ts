import { Component, OnInit } from '@angular/core';
import {Settings} from '../../../app.settings.model';
import {MatDialog} from '@angular/material';
import {User} from './user.model';
import {UserService} from './user.service';
import {UserinfoComponent} from './userinfo/userinfo.component';
import {CompanyService} from '../company/company.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
    providers: [ UserService, CompanyService ]
})
export class UserComponent implements OnInit {
    public displayedColumns = ['username', 'name', 'company', 'tel', 'email', 'delete', 'edit'];
    public dataSource: any;
    public settings: Settings;
    public users: User[];
    dialogRef: any;
    selectedValue: any;
    companyOptions: any[] = [];
    company: any;

  constructor(public dialog: MatDialog,
              public usersService: UserService,
              public companyService: CompanyService) { }

  ngOnInit() {
      this.getCompanies();
      this.getUsers();
  }

    public getUsers(): void {
        this.users = null; //for show spinner each time
        this.usersService.getUsers().subscribe(users => {
            users.forEach(user => {
                if(user.companyId) {
                    this.getCompanyName(user.companyId);
                    user.companyId = this.selectedValue;
                }
            })
            this.users = users;
            this.dataSource = this.users;
        });
    }
    public addUser(user: User) {
        user = Object.assign(user, {
            companyId : user.companyId['text']
        });
        this.usersService.addUser(user).subscribe(user => this.getUsers());
    }
    public updateUser(user: User) {
        user = Object.assign(user, {
            companyId : user.companyId['text']
        });
        this.usersService.updateUser(user, user.id).subscribe(user => this.getUsers());
    }
    public deleteUser(user: User) {
        this.usersService.deleteUser(user.id).subscribe(user => this.getUsers());
    }

    getCompanies() {
        this.companyService.getCompany().subscribe(companies => {
            companies.forEach((x) => {
                this.companyOptions.push({
                    id: x.id,
                    text: x.name
                });
            });
        });
    }

    getCompanyName(val){
      if(val) {
          this.companyOptions.forEach(company => {
              if (val === company.id.toString()) {
                  this.selectedValue = company.text;
              }
          });
      }
    }
    public openUserDialog(user) {
      console.log("user", user);
      this.dialogRef = this.dialog.open(UserinfoComponent, {
            data: user
        });

        this.dialogRef.afterClosed().subscribe(user => {
            if (user) {
                (user.id) ? this.updateUser(user) : this.addUser(user);
            }
        });
    }
}
