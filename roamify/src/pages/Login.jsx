import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginAPI, registerAPI } from '../services/allAPI'



function Login({ insideRegister }) {

  const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const getErrorMessage = (result) => {
    if (typeof result?.data === "string") {
      return result.data
    }

    return result?.data?.message || "Something went wrong. Please try again."
  }

  const handleRegister = async () => {
    const name = userInfo.name.trim()
    const email = userInfo.email.trim().toLowerCase()
    const password = userInfo.password

    if (!name || !email || !password) {
      alert("Please fill the form completely")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await registerAPI({ name, email, password })

      if (result.status === 200) {
        alert("User Registered Successfully, Please login to explore")
        setUserInfo({ name: "", email: "", password: "" })
        navigate('/login')
      } else {
        alert(getErrorMessage(result))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlelogin = async () => {
    const email = userInfo.email.trim().toLowerCase()
    const password = userInfo.password

    if (!email || !password) {
      alert("Please enter your email and password")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await loginAPI({ email, password })

      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        alert("Login Successful")
        setUserInfo({ name: "", email: "", password: "" })
        navigate('/')
      } else {
        alert(getErrorMessage(result))
      }
    } finally {
      setIsSubmitting(false)
    }
  }








  return (



    <div className='text-center d-flex justify-content-center ' >

      <div style={{ height: "500px", width: "400px" }} className='border rounded shadow m-5'>

        <div className='p-3 mt-5'>
          <h1 className='text-center fw-bold'> Roamify</h1>
          <p className='text-secondary mt-4'>Sign {insideRegister ? 'Up' : 'In'} to your account</p>
          {insideRegister &&
            <div className='mt-3'>
              <input value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} type="text" placeholder='Username' className='form-control' />
            </div>}

          <div className='mt-4'>



            <input value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} type="email" placeholder='Email Address' className='form-control' />
          </div>          <div className='mt-3'>
            <input value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} type="password" placeholder='Password' className='form-control' />
          </div>
          {
            insideRegister ?
              <button disabled={isSubmitting} style={{ backgroundColor: "black", color: "yellowgreen" }} onClick={handleRegister} className='btn w-100 mt-3 fw-bold'>{isSubmitting ? 'Signing Up...' : 'Sign Up'}</button>
              :
              <button disabled={isSubmitting} style={{ backgroundColor: "black", color: "yellowgreen" }} onClick={handlelogin} className='btn w-100 mt-5 fw-bold'>{isSubmitting ? 'Signing In...' : 'Sign In'}</button>


          }

          {
            insideRegister ?
              <p className='mt-2'>Already have an account? <Link style={{ color: "yellowgreen" }} to={'/login'} className='fw-bold' >Login</Link> </p>
              :
              <p className='mt-2'>Don't have an account? <Link style={{ color: "yellowgreen" }} to={'/register'} className='fw-bold'>Register</Link> </p>


          }            </div>

      </div>
    </div>



  )
}

export default Login
