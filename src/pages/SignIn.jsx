import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad user credentials')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome back</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            className='emailInput'
            placeholder='Enter email'
            id='email'
            value={email}
            onChange={onChange}
          ></input>
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            ></input>
            <img
              className='showPassword'
              src={visibilityIcon}
              alt='Show password'
              onClick={() => setShowPassword((prevState) => !prevState)}
            ></img>
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password?
          </Link>
          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button type='submit' className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px'></ArrowRightIcon>
            </button>
          </div>
        </form>

        <OAuth></OAuth>

        <Link to='/sign-up' className='registerLink'>
          Sign Up
        </Link>
      </div>
    </>
  )
}

export default SignIn
