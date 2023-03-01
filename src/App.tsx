import React, { useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './containers/home/home';
import Login from './containers/login/login';
import TopicDetails from './containers/topic-details/topic-details';
import Topics from './containers/topics/topics';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import userStore from './stores/user-store';
import topicStore from './stores/topic-store';
import { useNavigate } from 'react-router-dom';
import Practice from './containers/practice/practice';
import appUsage from './api-calls/app-usage';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const addAppUsage = async () => {
    if (userStore.user) {
      await appUsage(userStore.user?.id, 'logged_in');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const user = localStorage.getItem('study_app_token');
    if (user) {
      const result = JSON.parse(user);
      runInAction(() => userStore.setUser(result));
      runInAction(() => topicStore.fetchTopics());
      navigate('/home');
      addAppUsage();
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Routes >
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topic-details/:id" element={<TopicDetails />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </>
  );
};

export default observer(App);
