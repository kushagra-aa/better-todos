export type BaseResponseType = {
  status: number;
  message: string;
};

export type ErrorResponseType = {
  errors?: Record<string, string>[];
  error: string;
} & BaseResponseType;

export type SuccessResponseType = {
  data: unknown;
  count: number;
  page: number;
  pageSize: number;
} & BaseResponseType;
