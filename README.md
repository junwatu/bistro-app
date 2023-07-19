## Welcome to Bistro

Bistro is a B2B SaaS application that was generated using [ROQ.ai](https://roq.ai/)

- Documentation: https://docs.roq.tech
- License: MIT

## Running locally

### (0) Prerequisites

Make sure these tools are installed and up-to-date:

- Node
- NPM (or Yarn)
- Docker or local database

### (1) Clone the repository

### (2) Setup environment variables

- Login to [ROQ Console](https://console.roq.tech) (opens in a new tab) and go to "Project Details"
- In the environment named "Local Environment", click the "Copy Env File" button and copy the entire output.
- Important: If your application is **not** running on `http://localhost:3000/`, change the URL in the environment's setting page before copying the output.
- Create a new file called .env in the root of your project and paste the content in.

```bash
cp .env.example .env
```

### (3) Install database

There are two options for installing a database:

1. You can install any database yourself that is supported by [PrismaORM](https://www.prisma.io/)
2. or you can install Postgres by using Docker. Make sure no other Postgres instance is running on the same machine.

```bash
docker-compose up
```

In any case, you need to add the configuration to your `.env` file:

```dotenv
DATABASE_URL
```

### (4) Install dependencies and start the application

```bash
# With npm
npm install
npm run dev
```

or

```bash
# With Yarn
yarn
yarn dev
```

Now you can open your app at [http://localhost:3000](http://localhost:3000).

## Further documentation

To learn more about ROQ UI components and APIs, take a look at [ROQ Documentation](https://docs.roq.tech)
