import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {
  @Input() selectedComic: { id: number; imageUrl: string; likes: number; comments: string[] } | null = null;
  newComment: string = '';
  @Output() addLike = new EventEmitter<number>();

  @Output() addComment = new EventEmitter<{ comicId: number; comment: string }>();

  likeComic(): void {
    if (this.selectedComic) {
      this.addLike.emit(this.selectedComic.id);
    }
  }

  postComment(): void {
    if (this.selectedComic && this.newComment.trim()) {
      this.addComment.emit({ comicId: this.selectedComic.id, comment: this.newComment });
      this.newComment = '';
    }
  }
}


