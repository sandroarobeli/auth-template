// Third party
import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Custom
import { selectToken, autoLogin } from './redux/userSlice'

import NavBar from './features/shared/NavBar'
import Home from './features/shared/Home'
import Signup from './features/shared/Signup'
import Login from './features/shared/Login'
import UserPage from './features/user/UserPage'
import './App.css';

function App() {
  // From redux
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  
  const isLoggedIn = token !== "" ? true : false

  // useEffect always runs AFTER the component renders
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token) {
      dispatch(autoLogin({
        userName: storedData.userName,
        userId: storedData.userId,
        email: storedData.email,
        token: storedData.token
      }))
    }
  }, [dispatch, autoLogin])

  let routes

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path='/' element={<NavBar />}>
          <Route path='' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='*' element={<Navigate replace to=''/>}/>
        </Route>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<NavBar />}>
          <Route path='' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate replace to='/login'/>}/>
        </Route>
      </Routes>
    )
  }


  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;


 


