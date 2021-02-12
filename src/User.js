import Api from './Api';
import emitter from './EventEmitter';

class User {
  constructor() {}

  async getUserData(username) {
    try {
      this.data = await Api.getUser(username);
      this.repos = await Api.getRepos(username);
      this.followers = await Api.getFollowers(username);
      emitter.emit('dataLoaded');
    } catch (e) {
      console.log(e);
      if ([404, 403].includes(e.response.status)) {
        emitter.emit('noUser');
      }
    }
  }
}

export default new User();
