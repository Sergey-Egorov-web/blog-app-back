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
