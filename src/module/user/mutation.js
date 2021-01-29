/* eslint-disable no-console */
export default {
  loginUser: async (parent, args, context) => {
    const { payload: { email, password } } = args;
    const { dataSources: { userAPI } } = context;
    const response = await userAPI.loginUser({ email, password });
    console.log('login user : ', response);
    const loginuser = JSON.stringify(response);
    return loginuser;
  }
};
