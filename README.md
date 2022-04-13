# LANL nEDM Server

# Getting started

Begin with `git clone https://github.com/dougUCN/LANL_nEDM.git`

## Django server backend (BE)

Set up a virtual environment and install required dependencies
```
python3 -m venv venv
source venv/bin/activate
pip install -r dependencies.txt
```
Note that if you're running a version of python > 3.6 you will have to remove
the line that states `dataclasses==0.8` in dependencies.txt

Create a file /nEDM_server/nEDM_server/security.py with the contents
```
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ... # Just google a way to generate one

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False # Obviously you can use True if you're in development
```

Run the backend server

```
cd nEDM_server # The directory that contains manage.py
daphne nEDM_server.asgi:application 
```

## Apollo client Node JS front end (FE)

To get the dependencies for the FE

```
npm install
```

And to run

```
cd client
npm start
```



