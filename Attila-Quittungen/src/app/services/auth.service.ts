import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  token:any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private enc: EnvService
  ) { }
  
  isLoggedIn() {
    return isLoggedIn;
  }

  // returns token
  login(username: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/login', {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
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
    )
  }

  register(username: String, vulgo: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {username: username, vulgo: vulgo, password: password}
    )
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
}
