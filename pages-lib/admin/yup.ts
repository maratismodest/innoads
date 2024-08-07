import { boolean, InferType, object, string } from 'yup';

export const schema = object({
  username: string().default(''),
});

export type IUserSearchForm = InferType<typeof schema>;

export const defaultValues: IUserSearchForm = {
  username: '',
};

export const postsSchema = object({
  published: boolean().default(false),
  unpublished: boolean().default(false),
});

export type IPostSearchForm = InferType<typeof postsSchema>;

export const defaultPostsValues: IPostSearchForm = {
  published: false,
  unpublished: false,
};
