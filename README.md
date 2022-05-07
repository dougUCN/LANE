# LANE (Los Alamos Neutron EDM)

# Getting started

Begin by cloning the repository:

```
git clone https://github.com/dougUCN/LANL_nEDM.git
```

## LANE Server (BE)

### 1. Setting up a virtual environment:

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

In `server`, run the following command to start the BE:

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

then

```
npm run generate
```

and to run the FE

```
npm start
```

## Contributing

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
