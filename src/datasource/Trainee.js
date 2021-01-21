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

  getAllTrainee() {
    return this.get('/getall?skip=0&limit=10');
  }

  createTrainee(data) {
    return this.post('/create', data);
  }

  updateTrainee(data) {
    return this.put('/update', data);
  }

  deleteTrainee(id) {
    return this.delete(`/delete?id=${id}`);
  }
}

export default TraineeAPI;
