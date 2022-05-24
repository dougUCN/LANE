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
source venv/bin/activate # Starts the venv
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

In the directory `server`, with venv enabled, run

```
python tests/genSecurityFile.py # --debug True <-- Only use this flag if in development!
```

**SECURITY WARNING: keep the secret key used in production secret!**

**SECURITY WARNING: don't run with debug turned on in production!**

### 3. Generate the live database

In `server`, with venv enabled, run

```bash
python manage.py migrate --database=live
```

### 4. Running the BE

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

[Contribution information for this project](CONTRIBUTING.md)
