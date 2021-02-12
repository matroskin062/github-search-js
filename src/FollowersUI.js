import User from './User';
import emitter from './EventEmitter';

class FollowersUI {
  constructor() {
    this.followersContainer = document.querySelector('.followers');
    this.followersCards = document.querySelector('.followers__cards');
    this.errorText = document.querySelector('.profile .error h3');
    this.error = document.querySelector('.profile .error');
    this.registerListeners();
  }

  renderFollowerList() {
    this.followersCards.innerHTML = '';

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
  }

  registerListeners() {
    emitter.subscribe('dataLoaded', () => {
      this.followersContainer.classList.add('hide');
      this.renderFollowerList();
    });
  }
}

export default FollowersUI;
