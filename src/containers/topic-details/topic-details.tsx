import React, { useState } from 'react';
import styles from './topic-details.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import userStore from '../../stores/user-store';
import NavBar from '../../components/nav/nav-bar';
import createQuestion from '../../api-calls/create-question';
import topicStore from '../../stores/topic-store';
import { runInAction } from 'mobx';
import SideMenu from '../../components/side-menu/side-menu';
import trashOutline from '../../pictures/trash-outline.svg';
import deleteQuestion from '../../api-calls/delete-question';

const TopicDetails: React.FC = () => {
  const [createExpanded, setCreateExpanded] = useState<boolean>(false);
  const [questionTitle, setQuestionTitle] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const params = useParams();

  const clearFields = () => {
    setDifficulty('');
    setQuestionTitle('');
    setAnswer('');
  };

  const createNewQuestion = async () => {
    if (questionTitle && answer && difficulty && userStore.user && params.id) {
      await createQuestion(questionTitle, answer, userStore.user.id, params.id, difficulty).then(() => runInAction(() => topicStore.fetchTopics()));
      clearFields();
    }
  };

  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.createQuestion}>
          <h2>{topicStore.topics.find(topic => topic.id === params.id)?.name ? topicStore.topics.find(topic => topic.id === params.id)?.name : 'No name specified.'}</h2>
          <div className={`${styles.expand} ${!createExpanded ? styles.minimized : ''}`}>
            <label htmlFor="question">Question:</label>
            <input type="text" id="question" value={questionTitle} onChange={e => setQuestionTitle(e.target.value)} />
            <label htmlFor="answer">Answer:</label>
            <input type="text" id="answer" value={answer} onChange={e => setAnswer(e.target.value)} />
            <label htmlFor="difficulty">Difficulty:</label>
            <input type="text" id="difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)} />
            <button className={styles.createQuestionButton} onClick={createNewQuestion}>Create</button>
          </div>
          <button className={styles.expandButton} onClick={() => setCreateExpanded(curr => !curr)}>{createExpanded ? 'Collapse' : 'Add question'}</button>
        </div>
        <div className={styles.questionContainer}>
          {
            topicStore.topics.find(topic => topic.id === params.id)?.questionList && topicStore.topics.find(topic => topic.id === params.id)?.questionList.length ?
              topicStore.topics.find(topic => topic.id === params.id)?.questionList.map(question =>
                <div key={question.id} className={styles.question}>
                  <h2>{question.title ? question.title : 'No title'}</h2>
                  <div className={styles.contentContainer}>
                    <div className={styles.content}>
                      <p><b>Answer:</b> {question.answer ? question.answer : 'No answer'}</p>
                      <p><b>Difficulty:</b> {question.difficulty ? question.difficulty : 'No difficulty'}</p>
                    </div>
                    <img alt="delete-question" src={trashOutline} onClick={() => {
                      deleteQuestion(question.id, userStore.user?.id ? userStore.user.id : '').then(() => runInAction(() => topicStore.fetchTopics()));
                    }} />
                  </div>
                </div>
              )
              :
              <p>No questions created for this topic.</p>
          }
        </div>
      </div>
      <SideMenu />
    </div>
  );
};

export default observer(TopicDetails);