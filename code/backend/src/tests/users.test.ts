import * as request from 'supertest';
import App from '../app';
import UserRoute from '../routes/users.route';

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('GET /users', () => {
    it('response statusCode 200', async() => {
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      const response = await request(app.getServer()).get(`${usersRoute.path}`);
      expect(response.status).toEqual(200);
      expect(response.body.data).toHaveLength(4);
    });
  });

  describe('GET /users/:id', () => {
    it('response statusCode 200', async() => {
      const userId = '1';
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);

      const response = await request(app.getServer()).get(`${usersRoute.path}/${userId}`);
      expect(response.body).toEqual({ data: { _id: userId, email: 'lim@example.com', password:'lim' }, message: 'findOne' });
    });
  });

  describe('POST /users', () => {
    it('response statusCode 201', async() => {
      const userData = { email: 'Robert@example.com', password:'robert' };
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);

      let response = await request(app.getServer()).post(`${usersRoute.path}`).send(userData);
      expect(response.status).toEqual(201);

      response = await request(app.getServer()).get(`${usersRoute.path}`);
      expect(response.status).toEqual(200);
      expect(response.body.data).toHaveLength(5);
    });
  });

  describe('PUT /users/:id', () => {
    it('response statusCode 200', async() => {
      const userId = 1;
      const userData = { name: 'Robert' };
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);

      let response = await request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);
      expect(response.status).toEqual(200);
      response = await request(app.getServer()).get(`${usersRoute.path}`);
      expect(response.status).toEqual(200);
      expect(response.body.data).toHaveLength(4);
    });
  });

  describe('DELETE /users/:id', () => {
    it('response statusCode 200', async() => {
      const userId = 1;
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      let response = await request(app.getServer()).delete(`${usersRoute.path}/${userId}`);
      expect(response.status).toEqual(200);

      response = await request(app.getServer()).get(`${usersRoute.path}`);
      expect(response.status).toEqual(200);
      expect(response.body.data).toHaveLength(3);
    });
  });
});
