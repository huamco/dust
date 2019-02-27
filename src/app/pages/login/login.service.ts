import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class LoginService {
    public url = 'http://localhost:3300/users/authenticate';
    constructor(public http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.url, { username: username, password: password })
            .pipe(map(user => {
                /*console.log(user);
                console.log(user.token);*/
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
