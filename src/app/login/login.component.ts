import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

//  usuario: Usuario = new Usuario();
  usuario: User = new User();
  usuarios: any;
  erro: any;
  //usuarios: User;

  ngOnInit(): void {
  }

  onSubmit() {
    this.fazerLogin();
  }

  fazerLogin(){
    // console.log(this.usuario);
    this.authService.fazerLogin().subscribe(
      (data: User) => {
        this.usuarios = data;
        for(let item of this.usuarios){
          if(item.email === this.usuario.email){
            localStorage.setItem('id', String(item.id))
            this.router.navigate(['/']);
          }
        }
      }, error => {
        this.erro = error;
      }
    )
    
  }

}
