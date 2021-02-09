/* eslint-disable import/extensions */
import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configuration.js';

class TraineeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/api/trainee`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  getAllTrainee({ skip, limit }) {
    return this.get('/getall', { skip, limit });
  }

  createTrainee(data) {
    return this.post('/create', data);
  }

  updateTrainee(data) {
    return this.put('/update', data);
  }

  deleteTrainee(originalId) {
    return this.delete(`/delete?originalId=${originalId}`);
  }
}

export default TraineeAPI;
