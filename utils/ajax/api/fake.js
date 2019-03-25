import ajax from '../services';

export const fakeAPI = () => ajax.get('https://jsonplaceholder.typicode.com/posts/1');
