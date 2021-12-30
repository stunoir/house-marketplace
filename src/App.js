import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/NavBar'
import PrivateRoute from './components/PrivateRoute'
import Explore from './pages/Explore'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Category from './pages/Category'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore></Explore>}></Route>
          <Route path='/offers' element={<Offers></Offers>}></Route>
          <Route path='/category/:categoryName' element={<Category></Category>}></Route>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
          <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
        </Routes>
        <NavBar></NavBar>
      </Router>
      <ToastContainer theme='dark'></ToastContainer>
    </>
  )
}

export default App
