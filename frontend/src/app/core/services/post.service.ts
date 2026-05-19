import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post, CreatePostRequest, UpdatePostRequest } from '../../shared/models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getAll(categoryId?: string, tagId?: string): Observable<Post[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('categoryId', categoryId);
    if (tagId) params = params.set('tagId', tagId);
    return this.http.get<Post[]>(this.apiUrl, { params });
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  getDrafts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/drafts`);
  }

  create(request: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, request);
  }

  update(id: string, request: UpdatePostRequest): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
