import { test } from 'node:test';
import { build } from '../helper';
import * as assert from 'node:assert'
  ;
test("productsRoute", async (t) => {
  const app=await build(t)
  const res=await app.inject({
  url: '/api/products',
  })
  assert.equal(res.statusCode, 200, "Status code is 200");
 assert.deepEqual(JSON.parse(res.body).length, 0, "Error get products");

 const product = {
   name: 'Whole Roasted Chicken',
   description: 'Seasoned and roasted to perfection, ready to eat.',
   price: 9.99,
   category: 'Food - Meats',
   ingredients: false,
 };
 const resPost=await app.inject({
   method: 'POST',
   url: '/api/products',
   body: {
     ...product
   }
 })
  const createdProduct=JSON.parse(resPost.body)
  assert.equal(resPost.statusCode, 200, "Status code is 200");
 assert.deepEqual(createdProduct.name, product.name);
assert.ok(createdProduct.id, "Id is not generated")

  const getProductById=await app.inject({
    method: 'GET',
    url: `/api/products/${createdProduct.id}`,
  })
  assert.equal(getProductById.statusCode, 200, "Status code is 200");
  assert.equal(JSON.parse(getProductById.body).name, createdProduct.name, "Error get product by id");


})