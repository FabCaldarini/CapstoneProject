import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    public userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  logout() {
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      this.router.navigate(['/']);
    },
    error => {
      console.error('Logout Error:', error);
    });
  }
}
