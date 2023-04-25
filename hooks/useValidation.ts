import {PostOptions} from "@/modules/PostForm/PostForm";
import {useEffect, useState} from "react";

export default function useValidation(value: any, validations: PostOptions) {
  const [error, setError] = useState('')

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'required':
          if (!value) {
            setError('Required')
            return
          }
        case 'minLength':
          if (value.length < validations['minLength']) {
            setError(`Short: should be longer than ${validations['minLength']}`)
            return
          }
        case 'maxLength':
          if (value.length > validations['maxLength']) {
            setError(`Long: should be shorter than ${validations['maxLength']}`)
            return
          }
        case 'min':
          if (value < validations['min']) {
            setError(`Small: should be bigger than ${validations['min']}`)
            return
          }
        default:
          setError('')
      }
    }

  }, [value, validations])

  return error
}
