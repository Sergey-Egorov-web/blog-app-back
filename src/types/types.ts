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
  emailConfirmation: {
    confirmationCode?: string;
    expirationDate?: Date;
    isConfirmed: boolean;
  };
};

export type UserViewModel = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export type PaginatorUserViewModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserViewModel[];
};

export type FieldError = {
  message: string | null;
  field: string | null;
};

export type APIError = {
  errorsMessages: FieldError[];
};

export type LoginInputModel = {
  loginOrEmail: string;
  password: string;
};

export type meViewModel = {
  email: string;
  login: string;
  userId: string;
};

export type blackListRefreshTokenDbType = { tokens: string[] };
// export interface CustomRequest extends Request {
//   userId?: string; // Добавляем свойство userId
// }

export type sessionsCollectionDbType = {
  sessionId: string;
  deviceId: string;
  userId: string;
  issuedAt: string;
  deviceName: string;
  ip: string;
  expirationDate: string;
};

export type DeviceViewModel = {
  ip: string;
  title: string;
  lastActivateDate: string;
  deviceId: string;
};

export enum createEntity {
  create = "Create",
  alreadyExists = "alreadyExists",
  mistake = "mistake",
}
