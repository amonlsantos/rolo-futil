import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { CreatePostRequest } from '../../../shared/models/post.model';
import { PostStatus } from '../../../shared/models/post-status.enum';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h4>New Post</h4>

    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <div class="row">
        <label for="title">Title</label>
        <input id="title" name="title" class="u-full-width" type="text" [(ngModel)]="request.title" required>
      </div>

      <div class="row">
        <label for="content">Content</label>
        <textarea id="content" name="content" class="u-full-width" [(ngModel)]="request.content" rows="12" required></textarea>
      </div>

      <div class="row">
        <label for="status">Status</label>
        <select id="status" name="status" class="u-full-width" [(ngModel)]="request.status">
          <option [value]="PostStatus.DRAFT">Draft</option>
          <option [value]="PostStatus.PUBLISHED">Published</option>
        </select>
      </div>

      <input type="submit" class="button-primary" value="Save">
    </form>
  `
})
export class CreatePostComponent {
  request: CreatePostRequest = {
    title: '', content: '', status: PostStatus.DRAFT, categoryId: '', tagIds: []
  };
  protected readonly PostStatus = PostStatus;

  constructor(private postService: PostService, private router: Router) {}

  onSubmit(): void {
    this.postService.create(this.request).subscribe(() =>
      this.router.navigate(['/writer/drafts'])
    );
  }
}
