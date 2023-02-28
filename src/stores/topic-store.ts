import { makeAutoObservable, observable, action } from 'mobx';
import getTopics from '../api-calls/get-topics';
import { Topic } from '../models/topic';
import userStore from './user-store';

export class TopicStore {
  topics: Topic[] = [];

  constructor() {
    makeAutoObservable(this, {
      topics: observable,
      setTopics: action,
      fetchTopics: action,
    });
  }

  setTopics(topics: Topic[]) {
    this.topics = topics;
  }

  async fetchTopics() {
    const topics = await getTopics(userStore.user?.id ? userStore.user.id : '');
    if (topics.success && topics.data) {
      this.topics = topics.data;
    }
  }
}

const topicStore = new TopicStore();

export default topicStore;