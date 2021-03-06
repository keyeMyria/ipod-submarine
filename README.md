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
python3 manage.py test
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

5. Check if all solutions have been submitted when a solution is received --> if so, then toggle voting
6. Then we can work on VOTING on solutions if all solutions have been submitted. Like allSolutionsSubmitted (boolean)
7. Then we can work on tallying votes and determining who receives points.
8. After that we can work on logic for beginning a new round.
9. and finally ending a game.


Known issues:

1. If a user joins in the middle of a game, their view will be incorrect.
2. Voting starts when all solutions are submitted. If a user is AFK, then he will stall the game.
3. The game can stutter.