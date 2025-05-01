// types.ts
export interface Comment {
  _id: string;
  movieId: string;
  username: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}
