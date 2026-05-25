import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from '../../../core/services/post.service';
import { PostCardComponent } from '../../../shared/components/public/post-card/post-card.component';
import { Post } from '../../../shared/models/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, PostCardComponent],
  template: `
    <div class="row text-center hero-section">
      <div class="twelve columns">
        <img src="/logo.svg" alt="rolo futil" class="hero-logo">
        <p class="hero-subtitle">Nada mais fútil que um rolo de filme.</p>
      </div>
    </div>

    <div class="posts-grid" *ngIf="posts.length; else empty">
      <app-post-card *ngFor="let post of posts" [post]="post"></app-post-card>
    </div>

    <ng-template #empty>
      <p class="empty-text">Nenhum post publicado ainda.</p>
    </ng-template>
  `,
  styles: [`
    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
    .hero-section { margin-bottom: 2rem; }
    .hero-subtitle { color: #666; }
    .hero-logo { height: 120px; margin-bottom: 1rem; }
  `]
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe(posts => this.posts = posts);
  }
}
