import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/prisma';

beforeAll(async() => {
  await prisma.item.deleteMany();
});

afterAll(async() => {
 await prisma.$disconnect();
});

describe("Items API", () => {
  let itemId: number;

  test('POST create item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ "name": "Cookies", "age": 40 })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe("Cookies");
    itemId = res.body.id;
  })

  test('Get 1 item by id', async () => {
    const res = await request(app)
      .get(`/items/${itemId}`)
    
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Cookies")
  })

  test('Get by id should fail when given an id that does not exist', async () => {
    const res = await request(app)
      .get(`/items/12321321312`)
    
      expect(res.status).toBe(400);
      expect(res.body.msg).toBeDefined()
  });

  test('GET all items', async () => {
    const res = await request(app)
      .get('/items')

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PUT update an item', async () => {
    const res = await request(app)
      .put(`/items/${itemId}`)
      .send({ "name": "Brown Butter Cookies" })

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Brown Butter Cookies")
  })

  test('DELETE remove an item', async () => {
    const res = await request(app)
      .delete(`/items/${itemId}`)
    
    expect(res.status).toBe(204);

    const itemCheck = await request(app)
      .get('/items')

    expect(itemCheck.body.find((b: any) => b.id === itemId)).toBeUndefined();
  })
})
