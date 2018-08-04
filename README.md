# iPod Submarine

## Get started

Instructions for getting this project set up

### Back end

Set up virtual environment
```
pip3 install virtualenv
virtualenv venv
source venv/bin/activate
```

Create database
```
sudo apt-get install postgresql
sudo su postgres
psql
CREATE DATABASE ipod_submarine;
CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpass';
GRANT ALL PRIVILEGES ON DATABASE ipod_submarine TO youruser;
\q
exit
```

Install requirements and run
```
cd game
sudo apt install redis-server
pip3 install -r requirements.txt
redis-server & python3 manage.py runserver 0:8000
```

### Front end

```
yarn install
yarn start
```

### Useful commands

`kill -9 $(lsof -t -i:8000)` - kill all processes on port 8000