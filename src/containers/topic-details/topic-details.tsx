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
import editOutline from '../../pictures/create-outline.svg';
import editQuestion from '../../api-calls/edit-question';
import { Question } from '../../models/topic';
import closeOutline from '../../pictures/close-outline.svg';
import Spinner from '../../components/spinner/spinner';

const TopicDetails: React.FC = () => {
  const [editQuestionState, setEditQuestion] = useState<Question>();
  const [createExpanded, setCreateExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      setIsLoading(true);
      await createQuestion(questionTitle, answer, userStore.user.id, params.id, difficulty).then(() => runInAction(() => topicStore.fetchTopics()));
      setIsLoading(false);
      clearFields();
      setCreateExpanded(false);
    }
  };

  const saveEdit = async () => {
    if (editQuestionState && answer && difficulty && userStore.user) {
      setIsLoading(true);
      await editQuestion(editQuestionState.id, questionTitle, answer, editQuestionState.user_id, editQuestionState.topic_id, difficulty).then(() => runInAction(() => topicStore.fetchTopics()));
      setIsLoading(false);
      clearFields();
      setEditQuestion(undefined);
      setCreateExpanded(false);
    }
  };

  const setFields = (question: Question) => {
    if (question) {
      setDifficulty(question?.difficulty);
      setAnswer(question?.answer);
      setQuestionTitle(question?.title);
    }
  };

  return (
    <div className={`${styles.wrapper} ${isLoading ? styles.darken : ''}`}>
      <NavBar />
      <div className={styles.container}>
        {
          isLoading ?
            <Spinner />
            :
            null
        }
        <div className={styles.createQuestion}>
          <h2>{topicStore.topics.find(topic => topic.id === params.id)?.name ? topicStore.topics.find(topic => topic.id === params.id)?.name : 'No name specified.'}</h2>
          <div className={`${styles.expand} ${!createExpanded ? styles.minimized : ''}`}>
            <label htmlFor="question">Question:</label>
            <input type="text" id="question" value={questionTitle} onChange={e => setQuestionTitle(e.target.value)} />
            <label htmlFor="answer">Answer:</label>
            <input type="text" id="answer" value={answer} onChange={e => setAnswer(e.target.value)} />
            <label htmlFor="difficulty">Difficulty:</label>
            <input type="text" id="difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)} />
            <button className={styles.createQuestionButton} onClick={() => editQuestionState ? saveEdit() : createNewQuestion()}>{editQuestionState ? 'Edit' : 'Create'}</button>
          </div>
          <button className={styles.expandButton} onClick={() => setCreateExpanded(curr => !curr)}>{createExpanded ? 'Collapse' : editQuestionState ? 'Edit question' : 'Add question'}</button>
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
                    <div className={styles.questionActions}>
                      <img alt="edit" src={editQuestionState ? editQuestionState.id === question.id ? closeOutline : editOutline : editOutline} onClick={() => {
                        if (!editQuestionState) {
                          setEditQuestion(question);
                          setFields(question);
                          setCreateExpanded(true);
                        } else {
                          setCreateExpanded(false);
                          setEditQuestion(undefined);
                          clearFields();
                        }
                      }} />
                      <img alt="delete-question" src={trashOutline} onClick={async () => {
                        setIsLoading(true);
                        await deleteQuestion(question.id, userStore.user?.id ? userStore.user.id : '').then(() => runInAction(() => topicStore.fetchTopics()));
                        setIsLoading(false);
                      }} />
                    </div>
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