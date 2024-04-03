import { LoaderService } from './services/loader.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CapstoneProject';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,public loaderService: LoaderService ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkAuthentication();
    }
  }



  checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('User is logged in with token:', token);
    } else {
      console.log('No authentication token found, user is not logged in.');
    }
  }
}

