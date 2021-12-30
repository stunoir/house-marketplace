import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('There was an error logging in...')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Sign up below</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Enter your name'
            id='name'
            value={name}
            onChange={onChange}
          ></input>
          <input
            type='email'
            className='emailInput'
            placeholder='Enter your email'
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
          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button type='submit' className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px'></ArrowRightIcon>
            </button>
          </div>
        </form>

        {/* GOOGLE OAUTH */}

        <Link to='/sign-in' className='registerLink'>
          Sign In
        </Link>
      </div>
    </>
  )
}

export default SignUp
