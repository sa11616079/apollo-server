/* eslint-disable no-console */
// /* eslint-disable no-console */
import Express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

export default class Server {
  constructor(config) {
    this.config = config;
    this.app = new Express();
    this.run = this.run.bind(this);
  }

  get application() {
    return this.app;
  }

  bootstrap() {
    return this;
  }

  run() {
    const { port, nodeEnv } = this.config;
    this.httpServer.listen(port, () => {
      console.log(`Server started on port ${port} (${nodeEnv})`);
    });
    return this;
  }

  async setupApollo(schema) {
    const { app } = this;
    this.server = new ApolloServer({
      ...schema,
      onHealthCheck: () => new Promise((resolve) => {
        resolve('I am Okay...');
      })
    });
    this.server.applyMiddleware({ app });
    this.httpServer = createServer(app);
    this.server.installSubscriptionHandlers(this.httpServer);
    this.run();
  }
}
