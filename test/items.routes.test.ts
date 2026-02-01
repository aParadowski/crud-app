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
      .send({
        "customerId": "123123123213",
        "firstName": "Jim",
        "lastName": "Bo",
        "company": "Acme",
        "city": "Denver",
        "country": "Sweden",
        "phone1": "2331124412",
        "phone2": "4421231123",
        "email": "cool@aol.com",
        "subscriptionDate": "2020-05-04",
        "website": "https://checkr.com"
      })

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe("Jim");
    itemId = res.body.id;
  })

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
      .send({ "company": "Checkr" })

    expect(res.status).toBe(200);
    expect(res.body.company).toBe("Checkr")
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
