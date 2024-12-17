export type User = {
  uuid: string;
  user_name: string;
  email: string;
  image: string;
  nickname?: string;
};

export type PostTypes = {
  idx: number;
  isAuthor: boolean;
  nickname: string;
  content: string;
  language: string;
  like: number;
  comment: number;
  reg_dt: Date;
};

export type InfiniteProps = {
  page: number;
  postsPerPage?: number;
  queryKey: string;
  date: Date;
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

export type createCommentProps = {
  uuid: string;
  post_id: string;
  nickname: string;
  comment: string;
};

export type CommentsTypes = {
  idx: number;
  post_id: string;
  isAuthor: boolean;
  nickname: string;
  comment: string;
  reg_dt: string;
};
