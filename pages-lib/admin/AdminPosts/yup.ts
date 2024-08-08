import { boolean, InferType, object, string } from 'yup';

export const postsSchema = object({
  published: boolean().default(false),
  unpublished: boolean().default(false),
});

export type IPostSearchForm = InferType<typeof postsSchema>;

export const defaultPostsValues: IPostSearchForm = {
  published: false,
  unpublished: false,
};
