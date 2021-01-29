/* eslint-disable no-console */
/* eslint-disable import/extensions */
import pubsub from '../pubsub.js';
import constant from '../../libs/constants.js';

export default {
  createTrainee: async (parent, args, context) => {
    const { dataSources: { traineeAPI } } = context;
    const { payload: { name, email, password } } = args;
    const response = await traineeAPI.createTrainee({ name, email, password });
    const createdTrainee = JSON.stringify(response);
    console.log('created data : ', createdTrainee);
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
    console.log('data :', data);
    const response = await traineeAPI.updateTrainee({ ...data });
    const updatedTrainee = JSON.stringify(response);
    console.log('trainee updated : ', updatedTrainee);
    pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: updatedTrainee });
    return updatedTrainee;
  },
  deleteTrainee: async (parent, args, context) => {
    const { dataSources: { traineeAPI } } = context;
    const { payload: { originalId } } = args;
    // const data = {
    //   originalId
    // };
    const response = await traineeAPI.deleteTrainee(originalId);
    const deletedTrainee = JSON.stringify(response);
    console.log('trainee deleted : ', response);
    pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: deletedTrainee });
    return deletedTrainee;
  }
};
