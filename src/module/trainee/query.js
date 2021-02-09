/* eslint-disable no-console */
export default {
  getAllTrainees: async (parent, args, context) => {
    console.log('inside getAllTrainees');
    const { dataSources: { traineeAPI } } = context;
    const { payload: { skip, limit } } = args;
    const response = await traineeAPI.getAllTrainee({ skip, limit });
    console.log('all data : ', response);
    return response;
  }
};
