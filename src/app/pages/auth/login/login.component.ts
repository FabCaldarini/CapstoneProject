import { Component } from '@angular/core';
import { UserLogin } from '../../../models/i-user-dto';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userLogin: UserLogin = {
    username: '',
    password: ''
  }

  logging = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = '#FFF8E7'; // Imposta il colore di sfondo solo quando è disponibile `document`
    }
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = ''; // Reimposta il colore di sfondo quando il componente viene distrutto
    }
  }

  loginUser() {
    this.logging = true;
    this.userService.login(this.userLogin)
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          setTimeout(() => {
            this.router.navigate(['../../dashboard/comics-page'])
          }, 2000);
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
  }
}
