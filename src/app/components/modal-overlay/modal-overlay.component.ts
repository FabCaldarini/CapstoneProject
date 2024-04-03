
import { Component, Input, HostListener, ElementRef, OnChanges, SimpleChanges, NgZone} from '@angular/core';
import { Comic } from '../../models/comic';
import {Comment} from '../../models/comment';
import { ComicsService } from '../../services/comics.service';
import { map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-modal-overlay',
  templateUrl: './modal-overlay.component.html',
  styleUrls: ['./modal-overlay.component.scss']
})
export class ModalOverlayComponent implements OnChanges {
  @Input() selectedComic: Comic | null = null;
  @Output() likeUpdated: EventEmitter<number> = new EventEmitter();
  isModalOpen = false;
  newComment: string = '';
  comments: Comment[] = [];
  likeCount: number = 0;
  hasLiked: boolean = false;

  constructor(private elementRef: ElementRef, private comicsService: ComicsService, private cdr: ChangeDetectorRef, private ngZone: NgZone) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedComic'] && changes['selectedComic'].currentValue) {
      this.fetchAndDisplayComments(changes['selectedComic'].currentValue.id);
    }
  }
  openModal(comic: Comic): void {
    if (comic) {
      this.selectedComic = comic;
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden';

      this.fetchLikeData(this.selectedComic.id);
    } else {
      console.error('Error: selectedComic is null');
    }
  }




  fetchLikeData(comicId: number): void {
    this.comicsService.fetchLikeCount(comicId).subscribe({
      next: (count) => {
        this.ngZone.run(() => {
          this.likeCount = count;
        });
      },
      error: (error) => console.error('Failed to fetch like count', error)
    });

    this.comicsService.checkIfUserHasLiked(comicId).subscribe({
      next: (hasLiked) => {
        this.ngZone.run(() => {
          this.hasLiked = hasLiked;
        });
      },
      error: (error) => console.error('Failed to check if user has liked', error)
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedComic = null;
    this.newComment = '';
    this.comments = [];
    document.body.style.overflow = '';
    this.likeCount = 0;
    this.hasLiked = false;
  }

  onClick(event: MouseEvent) {
    if (this.isModalOpen && event.target === this.elementRef.nativeElement) {
      this.closeModal();
    }
  }
  postComment(event: Event) {
    event.preventDefault();
    if (!this.selectedComic || !this.selectedComic.id || this.newComment.trim() === '') {
      return;
    }

    const commentData = { text: this.newComment };
    this.comicsService.postComment(this.selectedComic.id, commentData).subscribe({
      next: (comment) => {
        console.log('Comment posted successfully', comment);
        this.comments.push(comment);
        this.newComment = '';
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to post comment', error);
      }
    });
  }
  toggleLike(): void {
    if (!this.selectedComic) {
      console.error('No selected comic to toggle like.');
      return;
    }

    const comicId = this.selectedComic.id;

    const action$ = this.hasLiked ? this.comicsService.removeLikeFromComic(comicId) : this.comicsService.addLikeToComic(comicId);

    action$.subscribe({
      next: () => {
        this.hasLiked = !this.hasLiked;
        this.likeCount += this.hasLiked ? 1 : -1;
        this.likeUpdated.emit(comicId);
      },
      error: (error) => console.error('Failed to toggle like', error)
    });
  }



  fetchAndDisplayComments(comicId: number): void {
    this.comicsService.fetchComments(comicId).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      },
      error => console.error('Failed to fetch comments:', error)
    );
  }



}
