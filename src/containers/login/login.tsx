import React, { useState } from 'react';
import styles from './login.module.css';
import login from '../../api-calls/login';
import { useNavigate } from 'react-router-dom';
import userStore from '../../stores/user-store';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import getTopics from '../../api-calls/get-topics';
import topicStore from '../../stores/topic-store';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const userLogin = async () => {
    if (email.length > 0 && password.length > 0) {
      setError(false);
      const user = await login(email, password);
      if (user.success) {
        localStorage.setItem('study_app_token', JSON.stringify(user.data));
        runInAction(() => userStore.setUser(user.data));
        navigate('/home');
      } else {
        setError(true);
        return;
      }
      if (userStore.user) {
        const topics = await getTopics(userStore.user?.id);
        if (topics.success && topics.data) {
          runInAction(() => topicStore.setTopics(topics.data || []));
        }
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Login</h1>
        <div className={styles.group}>
          <input onChange={e => setEmail(e.target.value)} value={email} type="text" required />
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label>E-mail</label>
        </div>

        <div className={styles.group}>
          <input onChange={e => setPassword(e.target.value)} value={password} type="text" required />
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label>Password</label>
        </div>
        <button onClick={userLogin}><p>Login</p></button>
        <p className={styles.error}>{error ? 'Login failed. Check credentials.' : null}</p>
      </div>
    </div>
  );
};

export default observer(Login);