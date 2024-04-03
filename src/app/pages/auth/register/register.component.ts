import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserRegister } from '../../../models/i-user-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  userRegister: UserRegister = {
    username: '', email: '', password: '', name:'',surname:'',dateOfBirth:''
  };

  registering = false;
  isLoggedIn = false;

  constructor(private userService: UserService, private router: Router,) {}

  ngOnInit() {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = '#FFF8E7';
    }
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = '';
    }
  }

  registerUser() {
    this.registering = true;
    this.userService.register(this.userRegister)
      .subscribe(
        (response) => {
          console.log('Registrazione avvenuta con successo:', response);
          this.registering = false;
          setTimeout(() => {
            this.router.navigate(['auth/login'])
          }, 2000);
        },
        (error) => {
          console.error('Errore durante la registrazione:', error);
          this.registering = false;
        }
      );
  }
  logout() {
    this.userService.logout().subscribe(
      () => {
        console.log('Logout avvenuto con successo');
        this.router.navigate(['auth/login']);
      },
      (error) => {
        console.error('Errore durante il logout:', error);
      }
    );
  }
}



