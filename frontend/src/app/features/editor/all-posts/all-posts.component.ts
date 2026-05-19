import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from '../../../core/services/post.service';
import { PostCardComponent } from '../../../shared/components/public/post-card/post-card.component';
import { Post } from '../../../shared/models/post.model';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [NgFor, NgIf, PostCardComponent],
  template: `
    <h4>All Posts</h4>

    <div class="posts-grid" *ngIf="posts.length; else empty">
      <app-post-card *ngFor="let post of posts" [post]="post"></app-post-card>
    </div>

    <ng-template #empty>
      <p class="empty-text">No posts found.</p>
    </ng-template>
  `,
  styles: [`
    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
  `]
})
export class AllPostsComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.postService.getAll().subscribe(posts => this.posts = posts);
  }
}
