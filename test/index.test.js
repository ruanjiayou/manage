const request = require('supertest');
const mongoose = require('mongoose')
const app = require('../src/app');

test('Hello Word', async () => {
  const resp = await request(app.callback()).get('/')
  expect(resp.status).toBe(200);
  console.log(resp.body)
  expect(resp.text).toBe('Hello World!');
})

afterAll(() => mongoose.disconnect());
