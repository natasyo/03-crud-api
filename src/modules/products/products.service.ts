import { Product } from '../../types';
import * as fs from 'node:fs';
import path from 'node:path';
import { isUUID } from '../../util/uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';

export class ProductsService {
  products: Product[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src/data/products.json'), { encoding: 'utf-8' }),
  );
  static products: any;
  constructor() {}
  getProducts = () => {
    return this.products;
  };
  getProductById = (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    if (!isUUID(request.params.id)) {
      return reply.code(400).send({ message: 'Invalid UUID' });
    }
    const product = this.products.filter((product) => product.id === request.params.id)[0];
    if (!product) {
      return reply.code(404).send({ message: 'Product not found' });
    }
    return reply.code(200).send(product);
  };
  deleteProduct = (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    if (!isUUID(request.params.id)) {
      return reply.code(400).send({ message: 'Invalid UUID' });
    }
    const product = this.products.filter((product) => product.id === request.params.id)[0];
    if (!product) {
      return reply.code(404).send({ message: 'Product not found' });
    }
    this.products = this.products.filter(
      (product: { id: string }) => product.id !== request.params.id,
    );
    return reply.code(200).send({ message: 'Product deleted successfully' });
  };

  addProduct = (request: FastifyRequest<{ Body: Partial<Product> }>, reply: FastifyReply) => {
    let product = request.body;
    if (!product) {
      return reply.code(400).send({
        message: 'Product is empty',
      });
    }
    product.id = randomUUID().toString();
    console.log(product);
    if (
      Object.entries(product).some(
        ([key, value]) => value === undefined || value === '' || value === null,
      ) ||
      (product.price && product.price < 0)
    ) {
      return reply.code(400).send({
        message: 'body does not contain required fields or if price is not a positive number',
      });
    }
    this.products.push(product as Product);
    return reply.code(200).send(product);
  };
}
