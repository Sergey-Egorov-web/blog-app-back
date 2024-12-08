export type BlogPostInputModel = {
  title: string;
  shortDescription: string;
  content: string;
};

export type PaginatorBlogViewModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogOutputType[];
};

export type PaginatorPostViewModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostOutputType[];
};

export type BlogDbType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export type PostDbType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};

export type BlogOutputType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export type BlogInputType = {
  name: string;
  description: string;
  websiteUrl: string;
};
export type PostOutputType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};
export type PostInputType = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
};

export type UserInputModel = {
  login: string;
  password: string;
  email: string;
};

export type UserDbType = {
  id: string;
  login: string;
  password: string;
  email: string;
  createdAt: string;
};

export type UserOutputModel = {
  id: string;
  login: string;
  email: string;
};
