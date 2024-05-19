import { PostOptions } from '@/__deprecated__/modules/PostForm/PostForm';

export default function inputValidation(value: any, validations: PostOptions) {
  for (const validation in validations) {
    switch (validation) {
      case 'required':
        if (!value) {
          return false;
        }
      case 'minLength':
        if (value.length < validations['minLength']) {
          return false;
        }
      case 'maxLength':
        if (value.length > validations['maxLength']) {
          return false;
        }
      case 'min':
        if (value < validations['min']) {
          return false;
        }
      default:
        return true;
    }
  }
}
