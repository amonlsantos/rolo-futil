import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Tag {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class TagService {
  private readonly apiUrl = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }
}
