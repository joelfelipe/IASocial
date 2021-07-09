import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  usuario: Usuario = new Usuario();
  usuarios: any;

  ngOnInit(): void {
  }

  onSubmit() {
    this.fazerLogin();
  }

  fazerLogin(){
    // console.log(this.usuario);
    this.authService.fazerLogin(this.usuario).subscribe(
      data => {
        this.usuarios = data;
        console.log(this.usuarios);
        for(let item of this.usuarios){
          if(item.email === this.usuario.email){
            console.log(item.email);
            localStorage.setItem('id', String(item.id))
            this.router.navigate(['/']);
          }
        }
      }
    )
    
  }

}
