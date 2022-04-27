# LANL nEDM Server

- [LANL nEDM Server](#lanl-nedm-server)
  - [Getting Started <a name="getting-started"></a>](#getting-started-)
  - [Running the Django Server (BE) <a name="be"></a>](#running-the-django-server-be-)
    - [Generating a secret key <a name="generating-a-secret-key"></a>](#generating-a-secret-key-)
    - [Running the backend server <a name="running-the-be-server"></a>](#running-the-backend-server-)
  - [Running the Apollo Client (FE) <a name="running-the-fe-client"></a>](#running-the-apollo-client-fe-)

## Getting Started <a name="getting-started"></a>

Begin by cloning the repository:

```
git clone https://github.com/dougUCN/LANL_nEDM.git
```

## Running the Django Server (BE) <a name="be"></a>

Create a virtual environment via the following commands:

```
python3 -m venv venv
source venv/bin/activate
```

Update pip to the latest version:

```
python3 -m pip install --upgrade pip
```

Install dependencies:

```
python3 -m pip install -r dependencies.txt
```

**Note that if you're running a version of python > 3.6 you will have to remove
the line that states `dataclasses==0.8` in dependencies.txt**

### Generating a secret key <a name="generating-a-secret-key"></a>

In another tab, create a file `/nEDM_server/nEDM_server/security.py`.

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

### Running the backend server <a name="running-the-be-server"></a>

In the directory that contains `manage.py`, run the following command to start the server:

```
daphne nEDM_server.asgi:application
```

## Running the Apollo Client (FE) <a name="running-the-fe-client"></a>

Install FE dependencies

```
npm install
```

In the `client` directory, run via:

```
npm start
```
