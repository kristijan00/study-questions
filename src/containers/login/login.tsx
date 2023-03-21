import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import login from '../../api-calls/login';
import { useNavigate } from 'react-router-dom';
import userStore from '../../stores/user-store';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import getTopics from '../../api-calls/get-topics';
import topicStore from '../../stores/topic-store';
import appUsage from '../../api-calls/app-usage';
import InputGroup from '../../components/input-group/input-group';
import registerUser from '../../api-calls/register-user';
import Spinner from '../../components/spinner/spinner';

const Login: React.FC = () => {
  const [screen, setScreen] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }, [screen]);

  const addAppUsage = async () => {
    if (userStore.user) {
      await appUsage(userStore.user?.id, 'logged_in');
    }
  };

  const userLogin = async () => {
    if (email.length > 0 && password.length > 0) {
      setError(false);
      setIsLoading(true);
      const user = await login(email, password);
      if (user.success) {
        localStorage.setItem('study_app_token', JSON.stringify(user.data));
        runInAction(() => userStore.setUser(user.data));
        setIsLoading(false);
        navigate('/home');
        addAppUsage();
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

  const userRegistration = async () => {
    if (email.length > 0 && password.length > 6 && firstName.length > 0 && lastName.length > 0) {
      setError(false);
      setIsLoading(true);
      await registerUser(firstName, lastName, email, password).then(result => result.success ? setScreen('login') : setError(true));
      setIsLoading(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className={`${styles.wrapper} ${isLoading ? styles.darken : ''}`}>
      {
        isLoading ?
          <Spinner />
          : null
      }
      {
        screen === 'login' ?
          <div className={styles.container}>
            <h1>Login</h1>
            <InputGroup setState={setEmail} value={email} labelName={'E-mail'} />
            <InputGroup setState={setPassword} value={password} type="password" labelName={'Password'} />
            <button onClick={userLogin}><p>Login</p></button>
            <p className={styles.register}>Don't have an account? <span onClick={() => setScreen('register')}>Register.</span></p>
            <p className={styles.error}>{error ? 'Login failed. Check credentials.' : null}</p>
          </div>
          :
          <div className={styles.containerRegister}>
            <h1>Register</h1>
            <InputGroup setState={setFirstName} value={firstName} labelName={'First Name'} />
            <InputGroup setState={setLastName} value={lastName} labelName={'Last Name'} />
            <InputGroup setState={setEmail} value={email} labelName={'Email'} />
            <InputGroup setState={setPassword} value={password} type="password" labelName={'Password'} />
            <button onClick={userRegistration}><p>Register</p></button>
            <p className={styles.register}>Already have an account? <span onClick={() => setScreen('login')}>Login.</span></p>
            <p className={styles.error}>{error ? 'Registration failed. Check fields.' : null}</p>
          </div>
      }
    </div>
  );
};

export default observer(Login);