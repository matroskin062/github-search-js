import User from './User';
import emitter from './EventEmitter';

class ProfileUI {
  constructor() {
    this.profile = document.querySelector('.profile');
    this.tabs = document.querySelectorAll('.tabs button');
    this.render.bind(this);
    this.registerListeners.bind(this);
    this.registerListeners();
  }

  render() {
    if (User.data) {
      this.profile.classList.remove('hide');
      document.querySelector('.container > .error').classList.add('hide');
    } else {
      this.profile.classList.add('hide');
    }
  }

  handleError() {
    this.profile.classList.add('hide');
    document.querySelector('.container > .error').classList.remove('hide');
  }

  tabsHandler() {
    this.tabs[0].classList.add('active');
    this.tabs[1].classList.remove('active');

    this.tabs[0].addEventListener('click', () => {
      document.querySelector('.repos').classList.remove('hide');
      document.querySelector('.followers').classList.add('hide');
    });

    this.tabs[1].addEventListener('click', () => {
      document.querySelector('.followers').classList.remove('hide');
      document.querySelector('.repos').classList.add('hide');
    });

    [...this.tabs].map((el) => {
      el.addEventListener('click', (e) => {
        [...this.tabs].forEach((el) => el.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  registerListeners() {
    emitter.subscribe('dataLoaded', () => {
      this.render();
      this.tabsHandler();
    });

    emitter.subscribe('noUser', () => this.handleError());
  }
}

export default new ProfileUI();
