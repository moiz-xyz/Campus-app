// src/router/Router.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Authentication/Signup';
import Login from '../pages/Authentication/Login';
import PageNotFound from '../pages/NotFound';
import JobPost from '../componets/Job Post section/JobPost';
import Layout from '../Layout/Layout';
import ViewJobs from '../componets/Jobview/JobView';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/jobPost' element={<JobPost />} />
        <Route path='/viewjobs' element={<ViewJobs />} />
      </Route>

      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={<Login />} />

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
