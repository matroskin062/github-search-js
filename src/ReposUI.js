import emitter from './EventEmitter';
import User from './User';
import ico from './assets/repo-ico.png';
import { getLangColor } from './utils';

class ReposUI {
  constructor() {
    this.reposContainer = document.querySelector('.repos');
    this.reposCards = document.querySelector('.repos__cards');
    this.error = document.querySelector('.repos .error');
    this.registerListeners();
  }

  renderReposList() {
    this.reposCards.innerHTML = '';
    if (User.repos.length) {
      User.repos.map((repo) => {
        const card = document.createElement('div');
        card.classList.add('repos__card', 'card');

        const repoIco = document.createElement('img');
        repoIco.src = ico;

        const repoInfo = document.createElement('div');
        repoInfo.classList.add('repos__card-info');

        const cardTitleLink = document.createElement('a');
        cardTitleLink.textContent = repo.name;
        cardTitleLink.href = repo.html_url;
        cardTitleLink.target = 'blank';

        card.append(repoIco);
        card.append(repoInfo);
        repoInfo.append(cardTitleLink);

        if (repo.description) {
          const repoDesc = document.createElement('p');
          repoDesc.textContent = repo.description;
          repoInfo.append(repoDesc);
        }

        if (repo.language) {
          const langBlock = document.createElement('div');
          langBlock.classList.add('language');

          const circle = document.createElement('span');
          circle.style.backgroundColor = getLangColor(repo.language);

          const title = document.createElement('p');
          title.textContent = repo.language;

          langBlock.append(circle, title);
          repoInfo.append(langBlock);
        }

        this.reposCards.append(card);
      });
    } else {
      this.error.classList.remove('hide');
    }
  }

  render() {
    if (User.repos) {
      this.reposContainer.classList.remove('hide');
    } else {
      this.reposContainer.classList.add('hide');
    }
  }

  registerListeners() {
    emitter.subscribe('dataLoaded', () => {
      this.error.classList.add('hide');
      this.render();
      this.renderReposList();
    });
  }
}

export default new ReposUI();
