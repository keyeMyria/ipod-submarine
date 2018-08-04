from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import AbstractUser
from game.core.models.validators import validate_solution_length

class Player(AbstractUser):
    points = models.IntegerField(default=0) # player receives points when he correctly guesses who Alan is

    def __str__(self):
        return self.username

class Problem(models.Model):
    alan = models.ForeignKey('Player', on_delete=models.CASCADE, default=1)
    text = models.CharField(max_length=100)

    def get_alans_solution(self):
        return self.solution_set.filter(author=self.alan)

    def reward_points(self):
        correct_solution = get_alans_solution(self)
        correct_guesses = correct_solution.get_all_guesses()
        for guess in correct_guesses:
            guess.player_guessing.points+=1

    def get_all_solutions(self):
        return self.proposed_solutions

class Solution(models.Model):
    solution_text = models.CharField(max_length=40, validators=[validate_solution_length])
    author = models.ForeignKey('Player', on_delete=models.CASCADE)
    problem = models.ForeignKey('Problem', on_delete=models.CASCADE, related_name='proposed_solutions')

    def __str__(self):
        return self.solution_text
    
    def get_all_guesses(self):
        return self.guesses

class Guess(models.Model):
    player_guessing = models.ForeignKey('Player', on_delete=models.CASCADE, related_name='guesses')
    solution = models.ForeignKey('Solution', on_delete=models.CASCADE)
