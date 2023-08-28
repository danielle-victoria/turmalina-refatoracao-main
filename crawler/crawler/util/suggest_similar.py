from crawler.models import ManagementUnit
from difflib import SequenceMatcher


# similarity threshold
SIMILARITY_RATIO_LIMIT = 0.6


def _check_similarity(word1, word2):
    """Check if two words are similar based on the similarity threshold 

    Args:
        word1 (string): word to be compared
        word2 (string): word to be compared

    Returns:
        [bool]: returns if the two words are similar
    """
    similarity_ratio = SequenceMatcher(None, word1, word2).ratio()
    return similarity_ratio > SIMILARITY_RATIO_LIMIT


def suggest_similar(word, column):
    """Suggests words similar to the input word based on database instances

    Args:
        word (string): word you want to search for similar
        column (database column): database column that the word should be compared
    """
    targets = ManagementUnit.select(column).distinct().tuples()
    targets = [target[0] for target in targets]
    def check_word(target): _check_similarity(word, target)
    if similar := list(filter(check_word, targets)):
        print(f"Did you mean: {', '.join(similar)}\n")
