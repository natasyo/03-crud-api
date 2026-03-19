import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const productsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance, options) => {
  const service = new ProductsService();
  const controller = new ProductsController(service);

  fastify.get('/', controller.getAll);
  fastify.get('/:id', controller.get);
  fastify.delete('/:id', controller.deleteById);
  fastify.post('/', controller.createProduct);
};

export default productsRoutes;
