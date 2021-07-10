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
  post: Post = new Post();
  posts: any;
  coments: any;
  pag: number = 1;
  contador: number = 8;
  isDisabled: boolean = true;
  constructor(private authService: AuthService, private router: Router, private postService: PostService) {
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
          // console.log(this.user);
        }
      );
    }
  }

  carregaPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data.reverse();
        // console.log(this.posts);
      }
    );
  }

  openModal(id: any) {
    // console.log(id);
    this.postService.getPost(id).subscribe(
      (data: Post) => {
        this.post = data;
        // console.log(this.post);
        const element = document.getElementById("show");
        if (element != null) {
          element.innerHTML = "<h1 style=\"font-weight: bold;\">" + this.post.title + "</h1>" +
            "<p>" + this.post.body + "</p>";
        }

      }
    );
    this.postService.getComent(id).subscribe(
      (data) => {
        this.coments = data.reverse();
        // console.log(this.coments);
        const element2 = document.getElementById("comentarios");
        if (element2 != null) {
          var s = '<h1 style=\"font-weight: bold;\">Comentários</h1>';
          for(let c of this.coments){
            s += "<h3 style=\"font-weight: bold;\"> ID: " + c.id + " - " + c.name + " comentou:</h3>" +
            "<p>" + c.body + "</p>"
          }
          element2.innerHTML = s;
        }
      }
    );
    const element3 = document.getElementById("show");
    if (element3 != null)
      element3.style.visibility = 'visible';
    const element4 = document.getElementById("comentarios");
    if (element4 != null)
      element4.style.visibility = 'visible';
    this.isDisabled = false;
  }

  close(){
    const element = document.getElementById("show");
    const element2 = document.getElementById("comentarios");
    if (element != null && element2 != null){
      element.style.visibility = 'hidden';
      element2.style.visibility = 'hidden';
    }
    this.isDisabled = true;
      
      
  }

}
