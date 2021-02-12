import FollowersUI from './FollowersUI';
import ProfileUI from './ProfileUI';
import ReposUI from './ReposUI';
import SearchForm from './SearchFormUI';
import { langColors } from './utils';

export default class App {
  static colors;
  static async init() {
    new SearchForm();
    this.colors = await langColors();
    ProfileUI.render();
    ReposUI.render();
    new FollowersUI();
  }
}
