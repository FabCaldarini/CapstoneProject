export interface ComicDetails {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  likeCount: number;
  hasLiked: boolean;
  comments: Comment[];

}

