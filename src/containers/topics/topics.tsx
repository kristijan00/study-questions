import React, { useState } from 'react';
import NavBar from '../../components/nav/nav-bar';
import TopicBox from '../../components/topic/topic-box';
import styles from './topics.module.css';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/user-store';
import createTopic from '../../api-calls/create-topic';
import SideMenu from '../../components/side-menu/side-menu';
import topicStore from '../../stores/topic-store';
import { runInAction } from 'mobx';
import Spinner from '../../components/spinner/spinner';

const Topics: React.FC = () => {
  const [newTopic, setNewTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const createNewTopic = async () => {
    if (newTopic && newTopic.length > 4 && userStore.user) {
      setIsLoading(true);
      await createTopic(newTopic, userStore.user.id).then(() => runInAction(() => topicStore.fetchTopics()));
      setIsLoading(false);
      setNewTopic('');
    }
  };

  return (
    <div className={`${styles.wrapper} ${isLoading ? styles.darken : ''}`}>
      <NavBar />
      <div className={styles.container}>
        {
          isLoading ?
            <Spinner />
            : null
        }
        <div className={styles.createTopic}>
          <h1>Create a new topic</h1>
          <input type="text" name="" id="" value={newTopic} onChange={e => setNewTopic(e.target.value)} placeholder="Name" />
          <button onClick={createNewTopic}>Create</button>
        </div>
        <div className={styles.topicList}>
          {
            topicStore.topics.length > 0 ?
              topicStore.topics.map(topic => <TopicBox key={topic.id} title={topic.name} topic_id={topic.id} setIsLoading={setIsLoading} onClick={() => navigate(`/topic-details/${topic.id}`)} />)
              :
              <h1 className={styles.noTopics}>No topics to display.</h1>
          }
        </div>
      </div>
      <SideMenu />
    </div>
  );
};

export default observer(Topics);