import { InferType, object, string } from 'yup';

export const schema = object({
  username: string().default(''),
});

export type IUserSearchForm = InferType<typeof schema>;

export const defaultValues: IUserSearchForm = {
  username: '',
};
