import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { PostService } from '../service/post.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = new User();
  post: Post = new Post();
  posts: any;
  pag : number = 1 ;
  contador : number = 8;
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

  openModal(id: any){
    console.log(id);
    this.postService.getPost(id).subscribe(
      (data: Post) => {
        this.post = data;
        console.log(this.post);
        const element = document.getElementById("show");
        if(element != null){
          element.innerHTML = "<h1>" + this.post.title + "</h1>" + 
                              "<p>" + this.post.body + "</p>";
        }
         
      }
    );
    const element2 = document.getElementById("comentarios");
    if(element2 != null){
      element2.innerHTML = "<h1>Comentários</h1>" + 
                           "<p>este é um comentario exemplo</p>";
    }
    
  }

  closeModal(){
    console.log("close");
  }

}
