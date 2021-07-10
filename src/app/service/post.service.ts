import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private router: Router, private http: HttpClient) { }


  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts'); 
  }

  getPost(id: string): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id); 
  }

  getComent(id: string): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments'); 
  }
}
