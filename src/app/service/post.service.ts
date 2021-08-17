import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Post } from '../model/post.model';
import { PostCompleto } from '../model/postCompleto.model';
import { Comment } from '../model/comment.model';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private router: Router, private http: HttpClient, private auth: AuthService) { }


  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getPostsByRange(inicial: number): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/posts?_start=' + inicial + '&_limit=6');
  }

  getPost(id: string): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  getComent(id: string): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments');
  }

}
