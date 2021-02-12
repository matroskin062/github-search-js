import axios from 'axios';

class Api {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.github.com/',
    });
  }

  async getUsers(username) {
    const { data } = await this.instance.get('/search/users', {
      params: {
        q: username,
        per_page: 10,
      },
    });

    return data.items;
  }

  async getUser(username) {
    const { data } = await this.instance.get(`/users/${username}`);

    return data;
  }

  async getRepos(username) {
    const { data } = await this.instance.get(`/users/${username}/repos`);

    return data;
  }

  async getFollowers(username) {
    const { data } = await this.instance.get(`/users/${username}/followers`);

    return data;
  }
}

export default new Api();
