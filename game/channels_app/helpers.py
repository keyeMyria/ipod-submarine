# Helper functions

def players_to_json(players):
    result = []
    for player in players:
        result.append({
            'username': str(player),
            'points': str(player.points)
        })
    return result