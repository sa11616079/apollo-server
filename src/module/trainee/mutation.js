/* eslint-disable no-console */
/* eslint-disable import/extensions */
import pubsub from '../pubsub.js';
import constant from '../../libs/constants.js';

export default {
  createTrainee: async (parent, args, context) => {
    const { dataSources: { traineeAPI } } = context;
    const { payload: { name, email, password } } = args;
    const response = await traineeAPI.createTrainee({ name, email, password });
    console.log('created data : ', response.data);
    pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: response.data.data });
    return response.data.data;
  },
  updateTrainee: async (parent, args, context) => {
    const { dataSources: { traineeAPI } } = context;
    const {
      payload: {
        originalId, name, email, role
      }
    } = args;
    const data = {
      id: originalId, name, email, role
    };
    const response = await traineeAPI.updateTrainee({ ...data });
    console.log('trainee updated : ', response);
    pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: response.data });
    return response.data;
  },
  deleteTrainee: async (parent, args, context) => {
    const { dataSources: { traineeAPI } } = context;
    const { payload: { originalId } } = args;
    const response = await traineeAPI.deleteTrainee(originalId);
    console.log('trainee deleted : ', response);
    pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: response.data });
    return response.data;
  }
};
