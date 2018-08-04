from django.contrib import admin
from game.core.models.game_models import Player, Problem, Solution, Guess
# Register your models here.

admin.site.register(Player)
admin.site.register(Problem)
admin.site.register(Solution)
admin.site.register(Guess)
