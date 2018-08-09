from django.test import TestCase
from game.core.models.game_models import Player, Problem, Solution, Guess

class PlayerModelTest(TestCase):
    @classmethod
    def setUp(cls):
        player = Player.objects.create(username="player", points=0)

    def test_string_representation(self):
        player = Player.objects.get(username="player")
        return self.assertEqual(str(player), player.username)

class ProblemModelTest(TestCase):
    @classmethod
    def setUp(cls):
        isAlan = Player.objects.create(username="isAlan", points=0)
        notAlan = Player.objects.create(username="notAlan", points=0)
        problem = Problem.objects.create(text="global warming", alan=isAlan)

        alansSolution = Solution.objects.create(solution_text="ice guns", problem=problem, author=isAlan)
    
    def test_successfully_grab_alans_solution(self):
        alan = Player.objects.get(username="isAlan")
        problem = Problem.objects.get(text="global warming")
        alans_solution = Solution.objects.get(author=alan)

        self.assertEqual(problem.get_alans_solution(), alans_solution)

    def test_string_representation(self):
        problem = Problem.objects.get(text="global warming")
        self.assertEqual(str(problem), problem.text)

class SolutionModelTest(TestCase):
    @classmethod
    def setUp(cls):
        solution_text= "ice guns"
        alan = Player.objects.create(username="isAlan", points=0)
        problem = Problem.objects.create(text="global warming", alan=alan)
        solution = Solution.objects.create(solution_text=solution_text, author=alan, problem=problem)
    
    def test_string_representation(self):
        solution = Solution.objects.get(solution_text="ice guns")
        self.assertEqual(str(solution), solution.solution_text)

class GuessModelTest(TestCase):
    @classmethod
    def setUp(cls):
        player_writing_solution = Player.objects.create(username="Dave", points=0)
        problem = Problem.objects.create(text="global warming", alan=player_writing_solution)
        solution = Solution.objects.create(solution_text="ice guns", author=player_writing_solution, problem=problem)

        player_guessing_solution = Player.objects.create(username="guessingDaveIsAlan", points=0)
        guess = Guess.objects.create(player_guessing=player_guessing_solution, solution=solution)

    def test_string_representation(self):
        player_guessing = Player.objects.get(username="guessingDaveIsAlan")
        guess = Guess.objects.get(player_guessing=player_guessing)
        self.assertEqual(str(guess), "guessingDaveIsAlan votes for ice guns")

    def test_verbose_name_plural(self):
        self.assertEqual(str(Guess._meta.verbose_name_plural), "guesses")