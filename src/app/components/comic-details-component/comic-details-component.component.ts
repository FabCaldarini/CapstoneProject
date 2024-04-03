
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicsService } from '../../services/comics.service';
import { Comic } from '../../models/comic';
import { Comment } from '../../models/comment';
import { ComicDetails} from '../../models/comic-details';

@Component({
  selector: 'app-comic-details-component',
  templateUrl: './comic-details-component.component.html',
  styleUrls: ['./comic-details-component.component.scss']
})
export class ComicDetailsComponent implements OnInit {
  comicId!: number;
  comic: ComicDetails | null = null;
  hasLiked: boolean = false;
  likeCount: number = 0;
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute, private comicsService: ComicsService) {
    this.route.params.subscribe(params => {
      this.comicId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.fetchComicDetailsAndComments();
    this.checkLikeStatus();
  }
  checkLikeStatus(): void {
    this.comicsService.checkIfUserHasLiked(this.comicId).subscribe(hasLiked => {
      this.hasLiked = hasLiked;
    });
    this.comicsService.fetchLikeCount(this.comicId).subscribe(count => {
      this.likeCount = count;
    });
  }

  fetchComicDetailsAndComments(): void {
    if (!this.comicId) return;

    this.comicsService.getComicDetails(this.comicId).subscribe({
      next: (comicDetails) => {
        this.comic = comicDetails;
        this.comments = comicDetails.comments.map((comment: any) => ({
          id: comment.id,
          user: comment.user,
          text: comment.text,
          createdAt: comment.createdAt,
        }));
      },
      error: (error) => console.error('Failed to fetch comic details:', error),
    });
  }
  toggleLike(): void {
    const action$ = this.hasLiked ? this.comicsService.removeLikeFromComic(this.comicId) : this.comicsService.addLikeToComic(this.comicId);

    action$.subscribe({
      next: () => {
        this.hasLiked = !this.hasLiked;
        this.likeCount += this.hasLiked ? 1 : -1;
      },
      error: (error) => console.error('Failed to toggle like', error),
    });
  }

}
