
export interface Comic {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
  imageUrl: string;
  comments: Comment[];
  likeCount: number;
  hasLiked: boolean;
}

