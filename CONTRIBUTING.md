# Contributing

### 1. Setting up a pre-commit Hook

In the root directory, run the following commands:

```
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

To ensure that the eslint pre-commit check is running correctly, create a branch with a commit that contains a `console.log`. If the commit is unsuccessful with the message: `Fix eslint errors and try again`, then the pre-commit is working correctly.

### 2. Working with the GraphQL Client (URQL)

This project uses URQL as the GraphQL Client. For more information on how to use URQL, please refer to the [official documentation](https://formidable.com/open-source/urql/docs/basics/react-preact/#run-a-first-query).

To generate types for GraphQL document declarations, run the following command in the `client` directory:

```
npm run generate
```

This will create a `generated.ts` file within the `src` directory with types and functions that can be used during development. This file is only used for development purposes and should not be checked into git in order to avoid possible merge conflicts.

**Note**:

Since this project uses the `typed-document-node` plugin, GraphQL Code Generator recommends that all gql document declarations should be made outside of `.ts`/`.tsx` files and in a `.graphql` file.

For example, given a file named `Dog.tsx`, all graphql document declarations should reside in a corresponding `Dog.graphql` file instead. For more information, please refer to the official documentation [here](https://www.graphql-code-generator.com/docs/guides/react#apollo-and-urql).

### 3. Styling (CSS)

This project uses Tailwind CSS framework for styling. To maintain consistency across the codebase, please do not create custom css files. Instead, all styling should be done in HTML/React JSX files. For more information on Tailwind CSS, please refer to the [official docs](https://tailwindcss.com/docs/utility-first) or try it out [here](https://play.tailwindcss.com/).

### 4. Working with the GraphQL Server

This project uses [Ariadne](https://ariadnegraphql.org/), a schema-first graphql python library.

To enable support of GraphQL Subscriptions, which require asgi servers, we utilize [Django channels](https://channels.readthedocs.io/en/stable/) for the web framework

**Note**

The Ariadne-asgi application is a Starlette object, which breaks several dependencies written for vanilla Django (WSGI) and can make routing slightly tricky. Refer to documentation [here](https://www.starlette.io/)

### 5. GraphQL Endpoints

The websocket endpoint (for GraphQL Subscriptions) is located at `ws://localhost:8000/graphql/`

The http endpoint (for Queries and Mutations) is located at `http://localhost:8000/graphql/`

Django default settings are such that the `/` at the end of the above urls is _mandatory_

**Note**

Ariadne implements [subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md) protocol for GraphQL subscriptions. Unfortunately, this is not a maintained library. Furthermore, as of May 2022 Ariadne has not implemented support for [graphql-ws](https://github.com/enisdenjo/graphql-ws), which is an active library for a similar protocol. Fundamentally, `graphql-ws` and `subscriptions-transport-ws` are different protocols, and as such any clients attempting to access the server with `graphql-ws` for subscriptions will be unsuccessful

### 6. Databases

LANE utilizes [sqlite](https://www.sqlite.org/index.html) for databases. These are locally hosted files on the production computer, which admittedly is inferior to cloud/external hosting. Unfortunately, attempting to access an externally hosted SQL database conflicts with Lab policy.

LANE has 3 databases:

| Name      | Location                     |
| --------- | ---------------------------- |
| `default` | `server/users/users.sqlite3` |
| `data`    | `server/data.sqlite3`        |
| `live`    | `server/liveData.sqlite3`    |

`default` stores only user information

`live` is a db that is kept very small in size, only carrying information regarding live runs and active EMS systems.

`data` stores processed data for viewing only on the web app. Large and unprocessed datafiles from experimental systems, such as the fast DAQ system, should have their own separate backup and storage.

In the event that `data` grows to be very large (presumably after years of successful data collection), follow these steps to create a new database

1. Move the old `data` sqlite3 file into your desired storage location (do NOT leave it in the `server` directory)
2. In `server`, activate the venv with `source venv/bin/activate`
3. Run `python manage.py migrate --database=data`

You will now have a new empty data base

**Note on migrations**

During development, and changes applied to `models.py` in a django app need to be propagated to all databases. To do so, start the venv and run

```bash
python manage.py makemigrations
python manage.py migrate # No flag needed to apply migrations to default
python manage.py migrate --database=data
python manage.py migrate --database=live
...# repeat for any additional databases
```

Note that the live db is currently in the gitignore. This is so that developers with different live tests will not push undesired data onto one another.
