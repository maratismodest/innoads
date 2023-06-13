import { PostOptions } from '@/modules/PostForm/PostForm';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

export default function useValidation(value: any, validations: PostOptions) {
  const { t } = useTranslation();
  const [error, setError] = useState('');

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'required':
          if (!value) {
            setError(t('required'));
            return;
          }
        case 'minLength':
          if (value.length < validations['minLength']) {
            setError(t('minLength', { min: validations['minLength'] }));
            return;
          }
        case 'maxLength':
          if (value.length > validations['maxLength']) {
            setError(t('maxLength', { max: validations['minLength'] }));
            return;
          }
        case 'min':
          if (value < validations['min']) {
            setError(t('min', { min: validations['min'] }));
            return;
          }
        case 'max':
          if (value > validations['max']) {
            setError(t('max', { max: validations['max'] }));
            return;
          }
        default:
          setError('');
      }
    }

  }, [value, validations]);

  return error;
}
