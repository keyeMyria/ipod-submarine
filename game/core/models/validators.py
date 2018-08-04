# Start solution validator
# Solutions must be less than or equal to 2 words
def solution_is_2_words_or_less(solution):
    return len(solution.split(" ")) <= 2

def validate_solution_length(solution):
    valid_solution_length = solution_is_2_words_or_less(solution)
    if solution is None or not valid_solution_length:
        raise ValidationError('Solution must be less or equal to 2 words',
            code='invalid',
            params={'solution': solution})
# End solution validator