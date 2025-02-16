import nltk
nltk.download('wordnet')
nltk.download('omw-1.4')
from nltk.corpus import wordnet as wn
import random
import sys
import json

def get_random_word(word_type):
    """Get a random word of a specific type (adjective or noun)."""
    words = []
    for synset in wn.all_synsets(word_type):
        for lemma in synset.lemmas():
            if lemma.name().isalpha():  # Ensure the word is alphabetic
                words.append(lemma.name())
    return random.choice(words)

def capitalize_first_letter(word):
    return word[0].upper() + word[1:]

def random_number():
    result = "{:02d}".format(random.randint(0, 99))
    if result[0] != result[1]:
        return random_number()
    else:
        return result


def generate_phrase():
    """Generate a phrase in the format 'adjective1 adjective2 noun'."""
    adjective1 = get_random_word(wn.ADJ).lower()
    adjective2 = capitalize_first_letter(get_random_word(wn.ADJ))
    noun = capitalize_first_letter(get_random_word(wn.NOUN))
    randNumber = random_number()

    return f"{adjective1}{adjective2}{noun}{randNumber}"

if __name__ == '__main__':
    # nltk.download('wordnet')
    # nltk.download('omw-1.4')
    phrase = generate_phrase()
    print(json.dumps({"phrase": phrase}))