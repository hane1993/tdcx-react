import React, { useContext } from 'react';

import './Header.css';
import { UserContext } from './context/UserContext';

export default function Header() {
  const { setIsLogin } = useContext(UserContext);

  return (
    <div>
      <header className='ct-docs-navbar'>
        <ul className='ct-docs-navbar-nav-left'>
          <li className='ct-docs-nav-item-dropdown'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
              alt='Profile'
            />
          </li>
        </ul>
        <ul style={{
          textDecorationLine: 'none'
        }} className='ct-docs-navbar-nav-right'>
          <li style={{
              textDecorationLine: 'none'
          }}
            className='ct-docs-navbar-nav-item'>
            <button
              className='btn btn-link'
              type='button'
              onClick={() => setIsLogin(false)}
            >
              Logout
            </button>
          </li>
        </ul>
        <button className='ct-docs-navbar-toggler' type='button'>
          <span className='ct-docs-navbar-toggler-icon'></span>
        </button>
      </header>
    </div>
  );
}
