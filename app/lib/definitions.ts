export type User = {
  uuid: string;
  user_name: string;
  email: string;
  image: string;
  nickname?: string;
};

export type PostTypes = {
  idx: number;
  uuid: string;
  nickname: string;
  content: string;
  language: string;
  like: number;
  comment: number;
  reg_dt: Date;
};
