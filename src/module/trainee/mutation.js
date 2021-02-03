/* eslint-disable no-console */
/* eslint-disable import/extensions */
import pubsub from '../pubsub.js';
import constant from '../../libs/constants.js';

export default {
  createTrainee: async (parent, args, context) => {
    console.log('inside create');
    const { dataSources: { traineeAPI } } = context;
    const { payload: { name, email, password } } = args;
    const response = await traineeAPI.createTrainee({ name, email, password });
    const createdTrainee = JSON.stringify(response);
    pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: createdTrainee });
    return createdTrainee;
  },
  updateTrainee: async (parent, args, context) => {
    console.log('inside update');
    const { dataSources: { traineeAPI } } = context;
    const {
      payload: {
        originalId, name, email, role
      }
    } = args;
    const data = {
      originalId, name, email, role
    };
    const response = await traineeAPI.updateTrainee({ ...data });
    pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: response });
    return response;
  },
  deleteTrainee: async (parent, args, context) => {
    console.log('inside delete');
    const { dataSources: { traineeAPI } } = context;
    const { payload: { originalId } } = args;
    const response = await traineeAPI.deleteTrainee(originalId);
    pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: response });
    return response;
  }
};
