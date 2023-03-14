import React, { useState } from 'react'
import { loginSchema, yupErrorHandler } from '../services/yup.js'

const Login = ({ onPageClick }) => {
  const [state, setState] = useState({
    email: '',
    confirmEmail: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: null })
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const validateForm = () => {
    try {
      loginSchema.validateSync(state, { abortEarly: false })
    } catch (error) {
      // Local Validation Errors Handling
      return yupErrorHandler(error, true)
    }
  }
  const handleOnBlur = (e) => {
    setErrors({ ...errors, [e.target.name]: null })
    const yupErrors = validateForm()
    if (yupErrors) {
      setErrors({ ...errors, [e.target.name]: yupErrors[e.target.name] })
    }
  }
  const handleSubmit = (e) => {
    const yupErrors = validateForm()
    if (yupErrors) {
      setErrors(yupErrors)
    }
  }
  return (
    <LoginUI
      state={state}
      handleChange={handleChange}
      errors={errors}
      onPageClick={onPageClick}
      handleOnBlur={handleOnBlur}
      handleSubmit={handleSubmit}
    />
  )
}
const LoginUI = ({
  state,
  errors,
  handleChange,
  onPageClick,
  handleOnBlur,
  handleSubmit,
}) => {
  return (
    <div className="">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              src="https://dashboard.kiwify.com.br/_nuxt/img/kiwify-green-logo.2af0e50.png"
              alt="Workflow"
              className="mx-auto h-12 w-auto"
            />
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Login to your account
            </h2>
            <p className="mt-2 text-center text-base leading-5 text-gray-600">
              Or
              <span
                onClick={() => onPageClick()}
                className=" cursor-pointer ml-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                register
              </span>
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <form className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5 mb-1 text-gray-700"
                >
                  E-mail
                </label>
                <div>
                  <input
                    type="text"
                    onBlur={handleOnBlur}
                    autoComplete="username"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full ${
                      errors.email && 'border-red-500 outline-none text-red-500'
                    }`}
                  />
                  <span className="text-xs text-red-500">{errors.email}</span>
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <div>
                  <input
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    onBlur={handleOnBlur}
                    className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full ${
                      errors.password &&
                      'border-red-500 outline-none text-red-500'
                    }`}
                  />
                  <span className="text-xs text-red-500">
                    {errors.password}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-end">
                <div className="text-sm leading-5">
                  <span className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Forgot password?
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    To Enter
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
