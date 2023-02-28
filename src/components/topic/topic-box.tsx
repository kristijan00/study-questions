import React from 'react';
import styles from './topic-box.module.css';
import trashOutline from '../../pictures/trash-outline.svg';
import deleteTopic from '../../api-calls/delete-topic';
import userStore from '../../stores/user-store';
import { observer } from 'mobx-react-lite';
import topicStore from '../../stores/topic-store';

interface Props {
  title: string;
  topic_id: string;
  onClick?: (e: React.MouseEvent) => void;
}

const TopicBox: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <img src={trashOutline} alt="delete_item" onClick={() => {
        deleteTopic(props.topic_id, userStore.user?.id ? userStore.user.id : '').then(() => {
          topicStore.fetchTopics();
        });
      }} />
      <div className={styles.body} onClick={props.onClick} >
        <h2>{props.title ? props.title : 'No title'}</h2>
      </div>
    </div>
  );
};

export default observer(TopicBox);