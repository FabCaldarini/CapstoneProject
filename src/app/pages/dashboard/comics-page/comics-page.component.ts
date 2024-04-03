import { Component, OnInit,HostListener } from '@angular/core';
import { ComicsService } from '../../../services/comics.service';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Comic } from '../../../models/comic';
import { Comment} from '../../../models/comment';
import { LikeService } from '../../../services/like.service';
import {ComicDetails} from '../../../models/comic-details';

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
    private likeService: LikeService,
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
        this.comic = comic;
        const comicId = comic.id;
        const file = form['image'].files[0];
        if (file) {
          this.uploadComicImage(comicId, file);
        }

        this.comics.push(comic);
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
          this.comic.imageUrl = event.body.imageUrl;
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

    this.userService.logout().subscribe(
      () => {
        console.log('Logout successful');
        this.isLoggedIn = false;
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
    ngOnInit(): void {

      this.isLoggedIn = this.userService.isLoggedIn();

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
    console.log("Apertura modal per il fumetto:", comic);
    this.selectedComic = comic;
  }

  refreshComicData(comicId: number): void {
    this.comicsService.getComicDetails(comicId).subscribe({
      next: (comicDetails: ComicDetails) => {
        const index = this.comics.findIndex(comic => comic.id === comicId);
        if (index !== -1) {
          this.comics[index] = comicDetails;
        }
      },
      error: (error) => {
        console.error(`Failed to refresh comic data for comicId ${comicId}`, error);
      }
    });
  }
  onAddLike(comicId: number): void {
    this.likeService.addLike(comicId).subscribe({
      next: () => {
        this.refreshComicData(comicId);
      },
      error: (error) => console.error('Error adding like:', error)
    });
  }


  onAddComment(comicId: number, commentText: string): void {
    this.comicsService.postComment(comicId, { text: commentText }).subscribe(
      (response) => {

        console.log('Comment added successfully:', response);

        const comic = this.comics.find(c => c.id === comicId);
        if (comic) comic.comments.push(response);
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
  }

  closeModal(): void {
    this.selectedComic = null;
  }
}

