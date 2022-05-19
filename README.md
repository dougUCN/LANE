# LANE (Los Alamos Neutron EDM)

# Getting started

Begin by cloning the repository:

```
git clone https://github.com/dougUCN/LANL_nEDM.git
```

## LANE Server (BE)

### 1. Setting up a virtual environment:

In the `server` directory

```
python3 -m venv venv
source venv/bin/activate
```

Update pip to the latest version:

```
python3 -m pip install --upgrade pip
```

Install dependencies

```
python3 -m pip install -r dependencies.txt
```

**Note that if you're running a version of python > 3.6 you will have to remove
the line that states `dataclasses==0.8` in dependencies.txt**

### 2. Generating a secret key

In another tab, create a file `/server/nEDM_server/security.py`.

Then, run the following code in a python interpreter:

```python
import secrets
secrets.token_urlsafe(16) # copy the output of this line
```

Next, add the following line to `security.py`:

```python
SECRET_KEY = # <paste_your_newly_generated_key_here>
```

**SECURITY WARNING: keep the secret key used in production secret!**

Finally, add the following line:

```python
DEBUG = False # use True if in development
```

**SECURITY WARNING: don't run with debug turned on in production!**

### 3. Running the BE

In `server`, make sure the venv is running, and run the following command to start the BE:

```
daphne nEDM_server.asgi:application
```

Basic queries can now be tested at the graphql endpoint, located at

http://127.0.0.1:8000/graphql/

**Note that the forward slash at the end is MANDATORY**

## LANE Web App (FE)

### 1. Installing FE dependencies

In the `client` directory, run

```
npm install
```

**Note:** Make sure the BE server is running before moving on to the next step.

then

```
npm run generate
```

and to run the FE

```
npm start
```

# Contributing

### 1. Setting up a pre-commit Hook

In the root directory, run the following commands:

```
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

To ensure that the pre-commit is running correctly, create a branch with a commit that contains a `console.log`. If the commit is unsuccessful with the message: `Fix eslint errors and try again`, then the pre-commit is working correctly.

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

## 5. GraphQL Endpoints

The websocket endpoint (for GraphQL Subscriptions) is located at [ws://localhost:8000/graphql/](ws://localhost:8000/graphql/)

The http endpoint (for Queries and Mutations) is located at [http://localhost:8000/graphql/](http://localhost:8000/graphql/)

Django default settings are such that the `/` at the end of the above urls is _mandatory_

**Note**

Ariadne implements [subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md) protocol for GraphQL subscriptions. Unfortunately, this is not a maintained library. Furthermore, as of May 2022 Ariadne has not implemented support for [graphql-ws](https://github.com/enisdenjo/graphql-ws), which is an active library for a similar protocol. Fundamentally, `graphql-ws` and `subscriptions-transport-ws` are different protocols, and as such any clients attempting to access the server with `graphql-ws` for subscriptions will be unsuccessful

## 6. Databases

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

Note that the live db is currently in the gitignore. This is so that developers with different live tests will not push undesired data onto one another. The hosted live db file on github should remain empty (with up to date models). If you apply migrations to this db make sure to run `git add --force server/liveData.sqlite3`
