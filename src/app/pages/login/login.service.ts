import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../admin/user/user.model';

@Injectable()
export class LoginService {
    public url = 'http://localhost:3300/users/authenticate';
    private currentUser : User;
    constructor(public http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.url, { username: username, password: password })
            .pipe(map(user => {
            console.log('user', user);
            console.log('user.token',user.token);
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log('localStorage::::', localStorage.getItem('currentUser'));
            }
            return user;
        }));
    }

    setCurrentUser(user){
        this.currentUser = user;
    }

    getCurrentUser(){
        return this.currentUser;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
