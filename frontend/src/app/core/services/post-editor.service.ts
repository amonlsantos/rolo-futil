import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post, CreatePostRequest, UpdatePostRequest } from '../../shared/models/post.model';

@Injectable({ providedIn: 'root' })
export class PostEditorService {
  private readonly apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  write(request: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/editor/write`, request);
  }

  edit(postId: string, request: UpdatePostRequest): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/editor/${postId}`, request);
  }

  publish(postId: string): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/editor/${postId}/publish`, {});
  }

  unpublish(postId: string): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/editor/${postId}/unpublish`, {});
  }

  delete(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/editor/${postId}`);
  }

  viewDrafts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/editor/drafts`);
  }
}
