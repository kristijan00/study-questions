import { observer } from 'mobx-react-lite';
import React from 'react';
import NavBar from '../../components/nav/nav-bar';
import SideMenu from '../../components/side-menu/side-menu';
import userStore from '../../stores/user-store';
import styles from './home.module.css';
import { useNavigate } from 'react-router';
import topicStore from '../../stores/topic-store';
import { Topic } from '../../models/topic';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const getNumberOfQuestions = (topic: Topic) => {
    return topicStore.topics.find(item => item.id === topic.id)?.noOfQuestions;
  };

  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.welcomeBack}>
          <h1>Welcome back {userStore.user?.first_name ? userStore.user.first_name : ''}</h1>
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.currentTopics}>
            <div className={styles.titleContainer}>
              <h3>Current topics</h3>
              <span onClick={() => navigate('/topics')}>More</span>
            </div>
            {
              topicStore.topics ? topicStore.topics.map(topic => <div key={topic.id} className={styles.topicItem}><p>{topic.name}</p> <p>No. of questions: {getNumberOfQuestions(topic)}</p></div>)
                :
                <h3>No created topics.</h3>
            }
          </div>
          <div className={styles.timeSpent}>
            <div className={styles.titleContainer}>
              <h3>Time spent studying</h3>
            </div>
          </div>
        </div>
      </div>
      <SideMenu />
    </div>
  );
};

export default observer(Home);