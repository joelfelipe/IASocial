import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { Comment } from '../model/comment.model';
import { PostService } from '../service/post.service';
import { PostCompleto } from '../model/postCompleto.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = new User();
  post: Post = new Post();
  postCompleto: PostCompleto[] = [];
  posts: Post[] = [];
  coments: Comment[] = [];
  pag: number = 1;
  contador: number = 8;
  isDisabled: boolean = true;
  userImgUrl: string = "../../assets/user-icon.jpg";

  constructor(private authService: AuthService, private router: Router, private postService: PostService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.iniciar();
    this.carregaPosts();
  }

  iniciar() {
    var id = localStorage.getItem('id')
    if (id == null) {
      this.router.navigate(['/login']);
    } else {
      var i: number = Number(localStorage.getItem('id'));
      this.authService.getUser(i).subscribe(
        (data: User) => {
          this.user = data;
        }
      );
    }
  }

  log(e: any){
    console.log(e);
  }

  carregaPosts(){
    let posts: Post[] = [];
    this.postService.getPostsByRange(this.postCompleto.length).subscribe(
      (data: Post[]) => {
        this.spinner.hide();
        posts = data;
        for (let p of posts) {
          let x: PostCompleto = new PostCompleto();
          x.body = p.body;
          x.id = p.id;
          x.title = p.title;
          x.userId = p.userId;
          this.authService.getUser(p.userId).subscribe(
            (data2: User) => {
              x.name = data2.name;
            }
          )
          this.postService.getComent(p.id.toString()).subscribe(
            (data3: Comment[]) => {
              x.comments = data3;
            }
          )
          this.postCompleto.push(x);
        }
      }
    );
    
  }

  onScroll() {
    this.spinner.show();
    setTimeout(() => {
      this.carregaPosts();
    }, 2000);
  }

}
