import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <p><a routerLink="/">&larr; Back</a></p>
    <p class="empty-text">Post detail page — to be implemented.</p>
  `
})
export class PostDetailComponent {}
