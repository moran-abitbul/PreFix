import nltk
from nltk.corpus import stopwords

# nltk.download('stopwords')
# nltk.download('popular')
sentence = 'In mathematics and computer science, an algorithm  is a finite sequence of well-defined instructions, typically used to solve a class of specific problems or to perform a computation. Algorithms are used as specifications for performing calculations and data processing. By making use of artificial intelligence, algorithms can perform automated deductions (referred to as automated reasoning) and use mathematical and logical tests to divert the code through various routes (referred to as automated decision-making). Using human characteristics as descriptors of machines in metaphorical ways was already practiced by Alan Turing with terms such as "memory", "search" and "stimulus".'


# Tokenize and tag some text:
print('tokenize:')
tokens = nltk.word_tokenize(sentence)
print(tokens)

# part of speech
tagged = nltk.pos_tag(tokens)
print(tagged[0:6])

# Identify named entities:
entities = nltk.chunk.ne_chunk(tagged)
print(entities)


# stopwords
stopWords = set(stopwords.words('english'))
# print(stops)

wordsFiltered = []

# remove stop word from the original sentence
for w in tokens:
    if w not in stopWords:
        wordsFiltered.append(w)

print(wordsFiltered)
