import { PostStatus } from './post-status.enum';

export interface Post {
  id: string;
  title: string;
  content: string;
  status: PostStatus;
  categoryId: string;
  tagIds: string[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  status: PostStatus;
  categoryId: string;
  tagIds: string[];
}

export interface UpdatePostRequest {
  id: string;
  title: string;
  content: string;
  status: PostStatus;
  categoryId: string;
  tagIds: string[];
}
