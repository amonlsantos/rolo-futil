import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { PostCardComponent } from '../../../shared/components/public/post-card/post-card.component';
import { Post } from '../../../shared/models/post.model';

@Component({
  selector: 'app-drafts',
  standalone: true,
  imports: [NgFor, NgIf, PostCardComponent, RouterLink],
  template: `
    <div class="page-header">
      <h4>My Drafts</h4>
      <a routerLink="/writer/create" class="button">New Post</a>
    </div>

    <div class="posts-grid" *ngIf="drafts.length; else empty">
      <app-post-card *ngFor="let post of drafts" [post]="post"></app-post-card>
    </div>

    <ng-template #empty>
      <p class="empty-text">No drafts yet.</p>
    </ng-template>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
  `]
})
export class DraftsComponent implements OnInit {
  drafts: Post[] = [];
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.postService.getDrafts().subscribe(drafts => this.drafts = drafts);
  }
}
