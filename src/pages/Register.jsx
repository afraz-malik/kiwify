import React, { useState } from 'react'
import { registerSchema, yupErrorHandler } from '../services/yup.js'

const Register = () => {
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
      registerSchema.validateSync(state, { abortEarly: false })
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
    setErrors(validateForm())
  }
  return (
    <RegisterUI
      state={state}
      handleChange={handleChange}
      errors={errors}
      handleOnBlur={handleOnBlur}
      handleSubmit={handleSubmit}
    />
  )
}
const RegisterUI = ({
  state,
  errors,
  handleChange,
  handleOnBlur,
  handleSubmit,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            src="https://dashboard.kiwify.com.br/_nuxt/img/kiwify-green-logo.2af0e50.png"
            alt="Kiwify"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create new account
          </h2>
          <p className="mt-2 text-center text-base leading-5 text-gray-600">
            Or
            <a
              href="/login"
              className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              log into your existing account
            </a>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <label className="block text-sm font-medium leading-5 mb-1 text-gray-700">
                E-mail
              </label>
              <div>
                <input
                  type="text"
                  autoComplete="off"
                  value={state.email}
                  onBlur={handleOnBlur}
                  name="email"
                  onChange={handleChange}
                  className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full ${
                    errors.email && 'border-red-500 outline-none text-red-500'
                  }`}
                />
                <span className="text-xs text-red-500">{errors.email}</span>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium leading-5 mb-1 text-gray-700">
                Repeat e-mail
              </label>
              <div>
                <input
                  type="email"
                  autoComplete="off"
                  value={state.confirmEmail}
                  onBlur={handleOnBlur}
                  name="confirmEmail"
                  onChange={handleChange}
                  className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full ${
                    errors.confirmEmail &&
                    'border-red-500 outline-none text-red-500'
                  }`}
                />
                <span className="text-xs text-red-500">
                  {errors.confirmEmail}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <div>
                <input
                  type="password"
                  autoComplete="off"
                  value={state.password}
                  onBlur={handleOnBlur}
                  name="password"
                  onChange={handleChange}
                  className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full ${
                    errors.password &&
                    'border-red-500 outline-none text-red-500'
                  }`}
                />
                <span className="text-xs text-red-500">{errors.password}</span>
              </div>
            </div>
            <div className="mt-6">
              <label className="relative flex items-start mt-2">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out cursor-pointer"
                  />
                </div>
                <div className="ml-2 text-sm leading-5">
                  <span className="font-medium text-gray-700">
                    I have read and accept Kiwify's
                    <a
                      href="https://kiwify.com.br/termos-de-uso"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 underline"
                    >
                      terms of use
                    </a>
                    ,
                    <a
                      href="https://kiwify.com.br/licenca-de-uso-software"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 underline"
                    >
                      software license terms
                    </a>
                    ,
                    <a
                      href="https://kiwify.com.br/politica-de-conteudo"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 underline"
                    >
                      content policy
                    </a>
                  </span>
                </div>
              </label>
            </div>
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  onClick={() => handleSubmit()}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Create an account
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
