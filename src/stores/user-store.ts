import { makeAutoObservable, observable, action } from 'mobx';
import { User } from '../models/user';

export class UserStore {
  user: User | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      setUser: action,
    });
  }

  setUser(user: User | undefined) {
    this.user = user;
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('study_app_token');
  }
}

const userStore = new UserStore();

export default userStore;