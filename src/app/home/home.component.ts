import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Usuario } from '../login/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user!: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    var id = localStorage.getItem('id')
    if(id === String(0)){
      console.log("entrei");
      this.router.navigate(['/']);
    }else{
      var i: number = Number(localStorage.getItem('id'));
      this.authService.getUser(i).subscribe(
        data =>{
          this.user = data;
          console.log(this.user);
        }
      );
    }
    // console.log(localStorage.getItem('usuario'));
    

    }

}
