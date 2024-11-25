export type BlogOutputType = {
  id: number;
  name: string;
  description: string;
  websiteUrl: string;
};

export type BlogInputType = {
  name: string;
  description: string;
  websiteUrl: string;
};
export type PostOutputType = {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};
export type PostInputType = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  // blogName: string;
};
