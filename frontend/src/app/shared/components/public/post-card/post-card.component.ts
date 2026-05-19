import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../models/post.model';
import { PostStatus } from '../../../models/post-status.enum';
import { NgClass, SlicePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterLink, NgClass, SlicePipe, DatePipe],
  template: `
    <div class="post-card" [ngClass]="{ 'draft': post.status === PostStatus.DRAFT }">
      <h5>
        <a [routerLink]="['/posts', post.id]">{{ post.title }}</a>
      </h5>
      <p>{{ post.content | slice:0:150 }}...</p>
      <div class="post-meta">
        <span class="status-badge" [ngClass]="post.status.toLowerCase()">{{ post.status }}</span>
        <span>{{ post.createdAt | date:'mediumDate' }}</span>
      </div>
    </div>
  `,
  styles: [`
    .post-card { background: #fff; border: 1px solid #e1e1e1; border-radius: 4px; padding: 2rem; }
    .post-card.draft { border-left: 3px solid #f0ad4e; }
    .post-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
    .status-badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 1.3rem; }
    .status-badge.draft { background: #fff3cd; }
    .status-badge.published { background: #d4edda; }
  `]
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  protected readonly PostStatus = PostStatus;
}
