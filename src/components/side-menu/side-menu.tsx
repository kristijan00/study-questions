import React from 'react';
import styles from './side-menu.module.css';
import userIcon from '../../pictures/user.png';
import userStore from '../../stores/user-store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import { runInAction } from 'mobx';

const SideMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p onClick={() => {
        navigate('/login');
        runInAction(() => userStore.logout());
      }}>Logout</p>
      <div className={styles.logoContainer}>
        <img src={userIcon} alt="user" />
        <h2>{userStore.user ? userStore.user.first_name + ' ' + userStore.user.last_name : 'No name specified'}</h2>
        <h3>Student</h3>
      </div>
      <div className={styles.reminder}>
        <h3>Reminders</h3>
      </div>
    </div>
  );
};

export default observer(SideMenu);