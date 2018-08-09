# Helper functions
from game.core.models.game_models import Player, Problem
from game.problems import problems
import random

def players_to_json(players):
    result = []
    for player in players:
        result.append({
            'username': str(player),
            'points': str(player.points)
        })
    return result

def pick_random_alan():
    #players = Player.objects.filter(has_been_alan=False)
    players = Player.objects.all()
    return random.sample(set(players), 1)[0]

def pick_random_problem():
    problem = random.sample(problems, 1)[0]
    return problem

def create_random_problem():
    text = pick_random_problem()
    alan = pick_random_alan()
    problem = Problem.objects.create(alan=alan, text=text)
    return problem