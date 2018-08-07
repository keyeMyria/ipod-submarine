# Helper functions
from game.core.models.game_models import Player
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