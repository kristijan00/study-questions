import React from 'react';
import styles from './nav-bar.module.css';
import { useNavigate } from 'react-router';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Study.io</h1>
      <ul>
        <li className={window.location.pathname === '/home' ? styles.active : ''} onClick={() => navigate('/home')}>
          <button>Dashboard</button>
        </li>
        <li className={window.location.pathname === '/topics' ? styles.active : ''} onClick={() => navigate('/topics')}>
          <button>Topics</button>
        </li>
        <li className={window.location.pathname === '/practice' ? styles.active : ''} onClick={() => navigate('/practice')}>
          <button>Practice</button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;