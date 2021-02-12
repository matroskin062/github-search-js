import { debounce } from './utils';
import Api from './Api';
import User from './User';
class SearchForm {
  constructor() {
    this.form = document.querySelector('form');
    this.input = document.querySelector('input');
    this.button = document.querySelector('button');
    this.autocomplete = document.querySelector('.autocomplete');
    this.registerListeners.bind(this);
    this.registerListeners();
  }

  async renderAutocomplete(e) {
    if (e.target.value.trim().length > 0) {
      const users = await Api.getUsers(e.target.value);
      this.autocomplete.innerHTML = '';
      this.createAutocompleteItems(users);
      this.autocomplete.classList.remove('hide');
    } else {
      this.autocomplete.classList.add('hide');
    }
  }

  createAutocompleteItems(users) {
    if (users.length) {
      users.map(({ login }) => {
        const p = document.createElement('p');
        p.textContent = login;
        const badge = document.createElement('span');
        badge.textContent = 'Jump to \u21B2';
        badge.classList.add('badge', 'hidden');
        p.append(badge);
        p.addEventListener('click', this.searchHandler.bind(this, login));
        p.addEventListener('mouseover', () => badge.classList.remove('hidden'));
        p.addEventListener('mouseout', () => badge.classList.add('hidden'));
        this.autocomplete.append(p);
      });
    } else {
      const p = document.createElement('p');
      p.textContent = 'No results found';
      this.autocomplete.append(p);
    }
  }

  searchHandler(login) {
    User.getUserData(login);
    this.input.value = '';
    this.autocomplete.classList.add('hide');
  }

  registerListeners() {
    this.input.addEventListener(
      'input',
      debounce(async (e) => {
        await this.renderAutocomplete(e);
      }, 500)
    );

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.searchHandler(this.input.value);
    });

    document.addEventListener('click', (e) => {
      if (!e.path.includes(this.input)) {
        this.autocomplete.classList.add('hide');
      }
    });

    this.input.addEventListener('focus', async (e) => {
      if (e.target.value.trim().length > 0) {
        await this.renderAutocomplete(e);
      }
    });
  }
}

export default SearchForm;
