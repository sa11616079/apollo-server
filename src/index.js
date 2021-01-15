/* eslint-disable import/extensions */
import schema from './module/index.js';
import Server from './server.js';
import configuration from './config/index.js';

const server = new Server(configuration);

server.bootstrap().setupApollo(schema);
