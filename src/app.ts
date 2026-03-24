import { join } from 'node:path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import productsRoutes from './modules/products/products.route';
import {
  FastifyError,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from 'fastify';

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });
  await fastify.register(productsRoutes, { prefix: '/api/products' });
  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply.code(404).send({
      statusCode: 400,
      error: 'Not Found',
      message: `Route ${request.method} ${request.url} not found`,
    });
  });
  fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    reply.code(500).send({
      statusCode: 500,
      error: 'Server error',
      message: error.message,
    });
  });
};

export default app;
export { app, options };
