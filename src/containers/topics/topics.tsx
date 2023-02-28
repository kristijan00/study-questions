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

const Topics: React.FC = () => {
  const [newTopic, setNewTopic] = useState<string>('');
  const navigate = useNavigate();

  const createNewTopic = async () => {
    if (newTopic && newTopic.length > 4 && userStore.user) {
      await createTopic(newTopic, userStore.user.id).then(() => runInAction(() => topicStore.fetchTopics()));
      setNewTopic('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.createTopic}>
          <h1>Create a new topic</h1>
          <input type="text" name="" id="" value={newTopic} onChange={e => setNewTopic(e.target.value)} placeholder="Name" />
          <button onClick={createNewTopic}>Create</button>
        </div>
        <div className={styles.topicList}>
          {
            topicStore.topics ?
              topicStore.topics.map(topic => <TopicBox key={topic.id} title={topic.name} topic_id={topic.id} onClick={() => navigate(`/topic-details/${topic.id}`)} />)
              :
              <h1>No topics to display.</h1>
          }
        </div>
      </div>
      <SideMenu />
    </div>
  );
};

export default observer(Topics);