import * as yup from 'yup'

// error handler
export const yupErrorHandler = (error, hideAlert) => {
  if (error.name === 'ValidationError') {
    let obj = {}
    for (let e of error.inner) {
      obj[e.path] = e.message
    }
    return obj
  } else if (error.response?.status === 409) {
    let obj = { ...error.response.data.payload }
    return obj
  }
  return null
}

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
})
export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required'),
  confirmEmail: yup
    .string()
    .email('Please enter a valid email.')
    .required('Confirm email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
})
