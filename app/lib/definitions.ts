export type User = {
  uuid: string;
  username?: string;
  email: string;
  image: string;
};

export type PostTypes = {
  idx: number;
  isAuthor: boolean;
  username: string;
  title: string;
  content: string;
  language: string;
  like: number;
  comment: number;
  reg_dt: string;
  initialLike: boolean;
};

export type CommentsTypes = {
  idx: number;
  post_id: number;
  isAuthor: boolean;
  username: string;
  comment: string;
  reg_dt: Date;
};

export type PostActionsProps = {
  title: string;
  content: string;
  language: string;
};

export type InfiniteProps = {
  page: number;
  postsPerPage?: number;
  queryKey: string;
  date: Date;
};

export type createCommentProps = {
  post_id: number;
  comment: string;
};

export type PostListResponse = {
  posts: PostTypes[];
  totalPage: number;
  pageParams: number;
};

export type CommentListResponse = {
  comments: CommentsTypes[];
  totalPage: number;
  pageParams: number;
};

interface InfiniteQueryBaseResponse {
  nextCursor: string | null;
  totalPosts: number;
  pageParams: number;
}

export interface InfiniteQueryResponse<T> extends InfiniteQueryBaseResponse {
  data: T;
}

export interface DetailedPostTypes extends PostTypes {
  likes: number;
  comments: number;
}
