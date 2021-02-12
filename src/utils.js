import axios from 'axios';
import App from './App';

export const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

export const langColors = async () => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'
  );

  return data;
};

export const getLangColor = (lang) => {
  return App.colors[lang].color;
};
