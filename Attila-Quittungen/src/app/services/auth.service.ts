import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    //private storage: NativeStorage,
    private storage: Storage,
    private env: EnvService
  ) { }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  // returns token
  login(username: string, password: string) {
    console.log('trying to log in');
    console.log(this.env.API_URL + 'tokens');
    // generate header
    const basic = 'Basic ' + btoa(username + ':' + password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': basic
    });
    console.log(headers);
    const options = { headers: headers };
    console.log(options);
    console.log('now requesting');
    return this.http.post(this.env.API_URL + 'tokens', null, options
    ).pipe(
      tap(token => {
        console.log(token);
        this.storage.set('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing token', error)

        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      })
    );
  }

  register(username: string, vulgo: string, password: string) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {username, vulgo, password}
    );
  }

  getToken() {
    //return this.storage.getItem('token').then
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}
