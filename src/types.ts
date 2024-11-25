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
export type POstOutputType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};
export type POstInputType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};
