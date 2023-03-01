import React, { useState, useEffect } from 'react';
import NavBar from '../../components/nav/nav-bar';
import SideMenu from '../../components/side-menu/side-menu';
import { Topic } from '../../models/topic';
import topicStore from '../../stores/topic-store';
import styles from './practice.module.css';
import { observer } from 'mobx-react-lite';

const Practice: React.FC = () => {
  const [state, setState] = useState<'view' | 'practice'>('view');
  const [topic, setTopic] = useState<Topic>();
  const [reveal, setReveal] = useState<boolean>(false);
  const [random, setRandom] = useState<number>(0);

  const startPractice = (topic: Topic) => {
    setTopic(topic);
    setState('practice');
  };

  const generateRandom = () => {
    if (topic && topic.questionList.length > 0) {
      const random = Math.floor(Math.random() * (topic.questionList.length));
      setRandom(random);
    }
  };

  useEffect(() => {
    generateRandom();
  }, []);

  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.topBox}>
          <h1>Practice</h1>
        </div>
        <div className={state === 'view' ? styles.topicContainer : styles.containerAlt}>
          {
            state === 'view' ?
              topicStore.topics.length > 0 ?
                topicStore.topics.map((topic, idx) =>
                  <div key={topic.id} className={styles.topicItem} style={{ '--count': idx } as React.CSSProperties}>
                    <h3>{topic.name ? topic.name : 'No name'}</h3>
                    <p>No. of questions: {topic.noOfQuestions ? topic.noOfQuestions : 0}</p>
                    <button onClick={() => startPractice(topic)}>Start</button>
                  </div>)
                :
                <h2 className={styles.noTopics}>No topics to display.</h2>
              :
              <div className={styles.practiceCard}>
                <button onClick={() => {
                  setRandom(0);
                  setState('view');
                }}>Back</button>
                {
                  topic?.questionList && topic?.questionList.length > 0 ?
                    <>
                      <h1>Topic: {topic.name ? topic.name : 'No title'}</h1>
                      <div className={styles.innerCard}>
                        <p><b>Question:</b> {topic.questionList[random].title}</p>
                        <p><b>Answer:</b> {topic.questionList[random].answer && reveal ? topic.questionList[random].answer : null}</p>
                        <div className={styles.buttonContainer}>
                          <button onClick={() => setReveal(curr => !curr)}>Reveal answer</button>
                          <button onClick={() => {
                            generateRandom();
                            setReveal(false);
                          }}>Next</button>
                        </div>
                      </div>
                    </>
                    :
                    <h2 className={styles.noQuestions}>No questions to display</h2>
                }
              </div>
          }
        </div>
      </div>
      <SideMenu />
    </div>
  );
};

export default observer(Practice);