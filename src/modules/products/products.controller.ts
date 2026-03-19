import { ProductsService } from './products.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Product } from '../../types';

export class ProductsController {
  constructor(private service: ProductsService) {}
  getAll = async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('service');
    return reply.code(200).send(this.service.getProducts());
  };
  get = (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    return this.service.getProductById(request, reply);
  };
  deleteById = (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    return this.service.deleteProduct(request, reply);
  };
  createProduct = (request: FastifyRequest<{ Body: Partial<Product> }>, reply: FastifyReply) => {
    return this.service.addProduct(request, reply);
  };
  update = (
    request: FastifyRequest<{ Params: { id: string }; Body: Partial<Product> }>,
    reply: FastifyReply,
  ) => {
    return this.service.updateProduct(request, reply);
  };
}
