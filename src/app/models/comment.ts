export interface Comment {
  id: number;
  user: {
    id: number;
    name: string;
    surname: string;
    username: string;
  };
  text: string;
  createdAt: string;
}
