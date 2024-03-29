import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Make userService public to access it in the template
  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  logout() {
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('authToken'); // Consider moving this to your UserService
      localStorage.removeItem('userRole'); // Consider moving this to your UserService
      this.router.navigate(['/']); // Redirect to homepage or login page
    },
    error => {
      console.error('Logout Error:', error);
    });
  }
}
