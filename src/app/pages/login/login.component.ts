import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {LoginService} from './login.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    providers: [ LoginService ]
})
export class LoginComponent {
  public form: FormGroup;
  public settings: Settings;
  public passwordHide: boolean = true;

  constructor(public appSettings: AppSettings,
              public fb: FormBuilder,
              public router: Router,
              public loginService: LoginService){
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      const uname = this.form.controls['username'].value;
      const upwd = this.form.controls['password'].value;
      this.loginService.login(uname, upwd)
            .pipe(first())
            .subscribe(
                data => {
                  //console.log(data);
                    this.router.navigate(['/']);
                },
                error => {
                    console.log('no no no no no no');
                    // this.alertService.error(error);
                    // this.loading = false;
                });
    }
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false;
  }
}
