### Crud-Project

This is a small project built to get more familiar with the Prisma and Sqlite frameworks.

#### Why Prisma and Sqlite?

Prisma is a type safe ORM that is relatively easy to standup and get running with minimal setup in v6. Similarly, Sqlite is lightweight and fast and requires minimal setup (basically none in this instance) to have a database spun up and accessibile. 

#### How to Run

After pulling the code and entering into the apps directory:

1. Run `npm i`.
2. Create a `.env` file and add an entry for `DATABASE_URL="file:./dev.db"`.
3. Run `npx prisma migrate dev` to setup the `prisma/dev.db` database, apply migrations, and generate the prisma client.
4. Run `npm run dev`.
5. Open up your browser to `http://localhost:3000/`, you should see "Server is running" message.

### Importing Data

You have a few options for this. The `/import` endpoint accepts a `filePath` argument to load in csv data into the sqlite database. You can use a tool like Postman or Bruno to simulate the api calls or through the `curl` command like so

```
curl --request POST \
  --url http://localhost:3000/items/import \
  --header 'content-type: application/json' \
  --data '{
  "filePath": "/path/to/your/data/items.csv"
}'
```

Once data is loaded, you can continue to use the tool of your choice to hit the endpoints for `/items` to add, update, or remove items from the database. 

### Prisma 

If you want to use Prisma's built in viewer, with the data seeded you can run `npx prisma studio` to view the current state of the `dev.db`.

### Testing

All routes should have tests, you can run these with `npm run test`.

