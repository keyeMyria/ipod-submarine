# iPod Submarine

Alan Mask's iPod Submarine is a real-time game inspired by a viral tweet featuring a game of the same name.

#### Premise
We have made modifications to the original idea, which you can find by googling "iPod Submarine." In our game, players first connect by entering their name. After someone presses "Start Game," the game begins by taking a random problem from a list we have curated (*This is different from users proposing problems in the original game). Everybody except for one person, assigned the role of Alan Mask, sees the problem. Players, including Alan Mask, then propose solutions. Solutions must be two words or less. After all players have proposed solutions, all players vote for the solution they think was proposed by Alan Mask. Players who correctly guess receive +1 point. If nobody guesses correctly, Alan Mask receives a point.

---

## Get started

Instructions for getting this project set up for the first time

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
python3 manage.py makemigrations
python3 manage.py migrate
redis-server & python3 manage.py runserver 0:8000
```

### Front end

```
cd frontend
yarn install
yarn start
```

### Useful commands

`kill -9 $(lsof -t -i:8000)` - kill all processes on port 8000

---

To do:

1. we can rewrite some stateless components as functions
2. rename things that are confusing (like problem text is just 'text' but solution text is 'solution_text')
3. try to separate game logic js functions into different files
4. haven't even gotten into implementing the game yet
5. player deleted on disconnect
6. 