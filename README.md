# LANL nEDM Server

# Getting started

Begin by cloning the repository:

```
git clone https://github.com/dougUCN/LANL_nEDM.git
```

## Running the Django Server (BE)

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

### 3. Running the backend server

In the directory that contains `manage.py`, run the following command to start the server:

```
daphne nEDM_server.asgi:application
```

## Running the Apollo Client (FE)

Install FE dependencies

```
npm install
```

In the `client` directory, run via:

```
npm start
```
