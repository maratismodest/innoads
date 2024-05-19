'use client';
import { PostOptions } from '@/__deprecated__/modules/PostForm/PostForm';
import { useEffect, useState } from 'react';

export default function useValidation(value: any, validations: PostOptions) {
  const [error, setError] = useState('');

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'required':
          if (!value) {
            setError('Поле обязательное');
            return;
          }
        case 'minLength':
          if (value.length < validations['minLength']) {
            setError('Минимальная длина: ' + validations['minLength']);
            return;
          }
        case 'maxLength':
          if (value.length > validations['maxLength']) {
            setError('Максимальная длина: ' + validations['maxLength']);
            return;
          }
        case 'min':
          if (value < validations['min']) {
            setError('Не меньше чем ' + validations['min']);
            return;
          }
        case 'max':
          if (value > validations['max']) {
            setError('Не больше чем ' + validations['max']);
            return;
          }
        default:
          setError('');
      }
    }
  }, [value, validations]);

  return error;
}
