import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
// import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [];
  user!: User;

  constructor(private router: Router, private http: HttpClient) { }


  fazerLogin(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users'); 
  }

  getUser(id: number): Observable<any>{
    return  this.http.get('https://jsonplaceholder.typicode.com/users/' + id);
  }

  fazerLogout() {
    this.router.navigate(['login']);
    localStorage.removeItem('id');

  }

}
