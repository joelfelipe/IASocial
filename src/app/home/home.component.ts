import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = new User();
  // posts: Post = new Post();
  posts: any;
  pag : number = 1 ;
  contador : number = 10;
  constructor(private authService: AuthService, private router: Router, private postService: PostService) {

  }

  ngOnInit(): void {
    this.iniciar();
    this.carregaPosts();
  }
  // console.log(localStorage.getItem('usuario'));

  iniciar() {
    var id = localStorage.getItem('id')
    console.log(id);
    if (id == null ) {
      console.log("entrei");
      this.router.navigate(['/']);
    } else {
      var i: number = Number(localStorage.getItem('id'));
      this.authService.getUser(i).subscribe(
        (data: User) => {
          this.user = data;
          console.log(this.user);
        }
      );
    }
  }

  carregaPosts(){
    this.postService.getPosts().subscribe(
      (data: Post) => {
        this.posts = data;
        console.log(this.posts);
      }
    );
  }

}
