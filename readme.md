# Backend template

Node, Express and MongoDB APP Template

## Running Project in Local

1. Install dependencies using `npm i`

2. Create .env file in root directory and add following configurations:

```
NODE_ENV= development
DB_URI= mongodb://localhost:27017/<db_name>
SERVER_PORT= <port_number>
API_PREFIX= /<api_prefix>

```

3. Start application using `npm run dev`

## Running Project in Production

1. Set environment variables for the following configurations:

```
DB_URI= <mongodb_uri>
SERVER_PORT= <port_number>
API_PREFIX= /<api_prefix>

```

2. Install dependencies using `npm i --omit=dev`

3. Start application using `npm start`
