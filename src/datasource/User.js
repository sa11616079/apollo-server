/* eslint-disable import/extensions */
import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configuration.js';

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/api/user`;
  }

  getMe() {
    return this.get('/me');
  }

  loginUser(playload) {
    return this.post('/login', playload);
  }
}

export default UserAPI;
