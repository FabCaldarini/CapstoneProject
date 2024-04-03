import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  addLike(comicId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/comics/${comicId}/like`, {});
  }

  removeLike(comicId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/comics/${comicId}/like`);
  }

  checkIfUserHasLiked(comicId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/api/comics/${comicId}/hasLiked`);
  }

  fetchLikeCount(comicId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/api/comics/${comicId}/likeCount`);
  }
}
