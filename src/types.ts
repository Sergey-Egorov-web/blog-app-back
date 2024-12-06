export type PaginatorBlogViewModel = {
  pageCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogOutputType[];
};

export type PaginatorPostViewModel = {
  pageCount: number;
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
