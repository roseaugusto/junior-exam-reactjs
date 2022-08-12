import React, { useState } from 'react';
import apiRequest from '../utils/apiRequest';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const login = async () => {
    await apiRequest
      .post('/login', userInfo)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/articles';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='grid place-items-center h-screen'>
      <form className='bg-slate-200 shadow-md rounded p-6 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
          <input
            className='input-text'
            type='text'
            placeholder='Email'
            name='email'
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
          <input
            className='input-text'
            type='password'
            placeholder='Password'
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <button className='primary-button font-bold' type='button' onClick={() => login()}>
            Sign In
          </button>
          <a className='text-xs hover:text-blue-500 pt-2' href='/register'>
            Don't have an account? Register here.
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
