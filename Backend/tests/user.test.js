import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';

describe('User API', () => {
  beforeAll(async () => {
    // Connect to test database if needed, but since server.js connects
    // we just wait for it. In a real scenario, use a separate test DB.
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return 200 on base route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('api is working');
  });

  it('should fail admin login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/user/admin/login')
      .send({ email: 'wrong@admin.com', password: '123' });
    
    expect(res.body.success).toBe(false);
  });
});
