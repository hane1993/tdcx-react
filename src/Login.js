import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';
import { useHistory } from 'react-router-dom';
import { apiRequest } from './api';

import './Login.css';

export default function Login() {
  const [id, setId] = useState('1');
  const [name, setName] = useState('Hane');
  const { setIsLogin } = useContext(UserContext);

  const history = useHistory();

  /**
   * API call to DB to login user
   */
  const handleLogin = () => {
    apiRequest('login', 'POST', { id, name }).then((response) => {
      if (response.success === true) {
        setIsLogin(true);
        history.push('/dashboard');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div className='card login-card'>
        <div className='card-body'>
          <h3 className='text-left'>Login</h3>
          <div className='input-group'>
            <input
              name='id'
              required='required'
              className='form-control'
              placeholder='Id'
              maxLength='255'
              type='text'
              id='userId'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className='input-group'>
            <input
              name='name'
              required='required'
              className='form-control mt-3'
              placeholder='Name'
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            className='btn btn-primary login-btn mt-3'
            type='button'
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
