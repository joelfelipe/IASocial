import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Usuario } from './login/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IASocial';
  usuarioLogado!: Usuario;

  constructor( private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  logout(){
    // console.log('logout');
    this.authService.fazerLogout();
  }

  home(){
    this.router.navigate(['/']);
  }

}
