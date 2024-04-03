import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Comic } from '../models/comic';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {Comment} from '../models/comment';
import {ComicDetails} from '../models/comic-details';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {
  private baseUrl = 'http://localhost:8080';


  constructor(private http: HttpClient,) { }

  createComic(comicData: { title: string, author: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.post(`${this.baseUrl}/api/comics/createComic`, comicData, { headers });
  }
  uploadComicImage(comicId: string, formData: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });

    return this.http.patch(`${this.baseUrl}/api/comics/${comicId}/upload`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    });

  }

  getAllComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.baseUrl}/api/comics/getAllComics`);
  }



  addLikeToComic(comicId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/comics/${comicId}/like`, {});
}
removeLikeFromComic(comicId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/api/comics/${comicId}/like`);
}

postComment(comicId: number, commentData: { text: string }): Observable<any> {
  const url = `${this.baseUrl}/api/comics/${comicId}/comments/create`;
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(url, commentData, { headers });
}

fetchComments(comicId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`${this.baseUrl}/api/comics/${comicId}/comments`).pipe(
    map((response: Comment[]) => response)
  );
}
fetchLikeCount(comicId: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/api/comics/${comicId}/likeCount`);
}

checkIfUserHasLiked(comicId: number): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseUrl}/api/comics/${comicId}/hasLiked`);
}

fetchComicWithComments(comicId: number): Observable<any> {
  const url = `${this.baseUrl}/api/comics/${comicId}/comments`;
  return this.http.get(url).pipe(
    catchError(error => {
      console.error('Error fetching comic comments:', error);

      return throwError(() => new Error('Failed to fetch comic comments. Please try again later.'));
    })
  );
}

getComicComments(comicId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`${this.baseUrl}/api/comics/${comicId}/comments`);
}

getComicDetails(comicId: number): Observable<ComicDetails> {
  return this.http.get<ComicDetails>(`${this.baseUrl}/api/comics/${comicId}/details`);
}

}
