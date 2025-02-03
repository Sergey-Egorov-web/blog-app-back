export type CommentInputModel = {
  content: string;
};

export type CommentViewModel = {
  id: string;
  content: string;
  commentatorInfo: CommentatorInfo;
  createdAt: string;
};

export type CommentatorInfo = {
  userId: string;
  userLogin: string;
};

export type CommentDbType = {
  id: string;
  content: string;
  commentatorInfo: CommentatorInfo;
  postId: string;
  createdAt: string;
};
export type PaginatorCommentViewModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: CommentViewModel[];
};

export type blackListRefreshTokenDbType = {
  tokens: string[];
};
