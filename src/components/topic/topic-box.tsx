import React, { SetStateAction } from 'react';
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
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

const TopicBox: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <img src={trashOutline} alt="delete_item" onClick={async () => {
        props.setIsLoading(true);
        await deleteTopic(props.topic_id, userStore.user?.id ? userStore.user.id : '').then(() => {
          topicStore.fetchTopics().then(() => props.setIsLoading(false));
        });
      }} />
      <div className={styles.body} onClick={props.onClick} >
        <h3>{props.title ? props.title : 'No title'}</h3>
      </div>
    </div>
  );
};

export default observer(TopicBox);