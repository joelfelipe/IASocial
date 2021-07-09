import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: Usuario[] = [];
  user!: Usuario;

  constructor(private router: Router, private http: HttpClient) { }


  fazerLogin(usuario: Usuario) {
    return  this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getUser(id: number){
    return  this.http.get('https://jsonplaceholder.typicode.com/users/' + id);
  }

  fazerLogout() {
    this.router.navigate(['login']);
    localStorage.removeItem('id');

  }

}
