import { InferType, number, object, string } from 'yup';

export const schemaSearch = object({
  title: string().default(''),
  categoryId: number(),
});

export type ISearchFormInput = InferType<typeof schemaSearch>;

export const defaultSearchValues: ISearchFormInput = {
  title: '',
  categoryId: undefined,
};
