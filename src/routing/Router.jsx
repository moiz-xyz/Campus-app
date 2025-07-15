import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Authentication/Signup'
import Login from '../pages/Authentication/Login'
import PageNotFound from '../pages/NotFound'
import JobPost from '../componets/Job Post section/JobPost'
import JobCard from '../componets/Jobview/JobCard'

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element ={ <Home/> } />
        <Route path='/register' element ={<Signup/> } />
        <Route path='/login' element ={ <Login/> } />
        <Route path='/jobPost' element ={ <JobPost/> } />
        <Route path='/viewjobs' element ={ <JobCard/> } />
        <Route path='*' element ={ <PageNotFound/> } />
      </Routes>

    </div>
  )
}

export default Router