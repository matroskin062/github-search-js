import User from './User';
import emitter from './EventEmitter';

class FollowersUI {
  constructor() {
    this.followersContainer = document.querySelector('.followers');
    this.followersCards = document.querySelector('.followers__cards');
    this.error = document.querySelector('.followers .error');
    this.registerListeners();
  }

  renderFollowerList() {
    this.followersCards.innerHTML = '';

    if (User.followers.length) {
      User.followers.map((user) => {
        const card = document.createElement('div');
        card.classList.add('followers__card', 'card');

        const avatar = document.createElement('img');
        avatar.src = user.avatar_url;

        const usernameLink = document.createElement('a');
        usernameLink.href = user.html_url;
        usernameLink.textContent = user.login;
        usernameLink.target = 'blank';

        const usernameLinkWrapper = document.createElement('div');

        card.append(avatar);
        card.append(usernameLinkWrapper);
        usernameLinkWrapper.append(usernameLink);
        this.followersCards.append(card);
      });
    } else {
      this.error.classList.remove('hide');
    }
  }

  registerListeners() {
    emitter.subscribe('dataLoaded', () => {
      this.error.classList.add('hide');
      this.followersContainer.classList.add('hide');
      this.renderFollowerList();
    });
  }
}

export default FollowersUI;
