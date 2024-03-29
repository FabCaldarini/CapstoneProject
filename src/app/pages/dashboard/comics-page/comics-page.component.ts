import { Component, OnInit,HostListener } from '@angular/core';
import { ComicsService } from '../../../services/comics.service';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Comic, Comment } from '../../../models/comic';

@Component({
  selector: 'app-comics-page',
  templateUrl: './comics-page.component.html',
  styleUrls: ['./comics-page.component.scss'],


})
export class ComicsPageComponent implements OnInit {
  comic: any = { imageUrl: null };
  comics: any[] = [];
  isLoggedIn = false;
  selectedComic: Comic | null = null;




  constructor(
    private comicsService: ComicsService,
    public userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  createComic(event: any) {
    event.preventDefault();
    const form = event.target;
    const title = form['title'].value;
    const author = form['author'].value;

    this.comicsService.createComic({ title, author }).subscribe({
      next: (comic) => {
        console.log('Comic created successfully', comic);
        this.comic = comic; // Store the uploaded comic data
        const comicId = comic.id; // Extract the ID of the newly created comic
        const file = form['image'].files[0];
        if (file) {
          this.uploadComicImage(comicId, file); // Use the ID to upload the image
        }
        // Update comics array
        this.comics.push(comic); // Add the new comic to the comics array
      },
      error: (error) => console.error('Error creating comic', error)
    });
  }

  uploadComicImage(comicId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.comicsService.uploadComicImage(comicId, formData).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('Image uploaded successfully', event);
          this.comic.imageUrl = event.body.imageUrl; // Update the image URL in the stored comic data
        }
      },
      error: (error: HttpErrorResponse) => console.error('Error uploading image', error)
    });
  }
  fetchComics() {
    this.comicsService.getAllComics().subscribe({
      next: (comics: any[]) => {
        this.comics = comics;
      },
      error: (error: any) => console.error('Error fetching comics', error)
    });
  }

  logout(): void {
    // Call the logout method from the UserService
    this.userService.logout().subscribe(
      () => {
        console.log('Logout successful');
        this.isLoggedIn = false; // Update the isLoggedIn flag
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
    ngOnInit(): void {
      // Check if the user is logged in
      this.isLoggedIn = this.userService.isLoggedIn();

      // Fetch comics
      this.fetchComics();
    }

    @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (event.deltaY !== 0) {
      event.preventDefault();
      this.scrollHorizontally(event.deltaY > 0 ? 100 : -100);
    }
  }

  scrollHorizontally(amount: number) {
    const element = document.querySelector('.images-container');
    if (element) {
      element.scrollLeft += amount;
    }
  }


  loadComics(): void {
    this.comicsService.getAllComics().subscribe(comics => this.comics = comics);
  }

  openModal(comic: Comic): void {
    this.selectedComic = comic;
  }
  onAddLike(comicId: number): void {
    this.comicsService.addLikeToComic(comicId).subscribe(() => {
      // Assuming the comic's like count is updated in real-time
      const comic = this.comics.find(c => c.id === comicId);
      if (comic) comic.likes += 1;
    });
  }

  onAddComment(comicId: number, commentText: string): void {
    this.comicsService.createComment(comicId, { text: commentText }).subscribe(() => {
      // Assuming the comic's comments are updated in real-time
      const comic = this.comics.find(c => c.id === comicId);
      if (comic) comic.comments.push(commentText);
    });
  }
  closeModal(): void {
    this.selectedComic = null;
  }
}

