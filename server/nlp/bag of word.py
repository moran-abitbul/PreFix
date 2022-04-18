# Python3 code for preprocessing text
import nltk
import re
import numpy as np
import heapq
from nltk.corpus import stopwords

# preprocess the data

text = 'In mathematics and computer science, an algorithm  is a finite sequence of well-defined instructions, typically used to solve a class of specific problems or to perform a computation. Algorithms are used as specifications for performing calculations and data processing. By making use of artificial intelligence, algorithms can perform automated deductions (referred to as automated reasoning) and use mathematical and logical tests to divert the code through various routes (referred to as automated decision-making). Using human characteristics as descriptors of machines in metaphorical ways was already practiced by Alan Turing with terms such as "memory", "search" and "stimulus".'

# Tokenize
#dataset = nltk.sent_tokenize(text)
tokens = nltk.word_tokenize(text)
print(tokens)

# Convert text to lower case
# Remove all non-word characters
# Remove all punctuations
for i in range(len(tokens)):
    tokens[i] = tokens[i].lower()
    tokens[i] = re.sub(r'\W', ' ', tokens[i])
    tokens[i] = re.sub(r'\s+', ' ', tokens[i])

stopWords = set(stopwords.words('english'))

wordsFiltered = []

# remove stop word from the original sentence
for w in tokens:
    if w not in stopWords:
        wordsFiltered.append(w)


# Obtaining most frequent words in our text

# Creating the Bag of Words model
word2count = {}
for data in wordsFiltered:
    #words = nltk.word_tokenize(data)
    # for word in words:
    # check if the word exists in our dictionary
    if data not in word2count.keys():
        word2count[data] = 1
    else:
        word2count[data] += 1

print('\nbag//dict:')
print(word2count)

freq_words = heapq.nlargest(5, word2count, key=word2count.get)

print('\nthe freq words:')

print(freq_words)


# tell us whether a word in each sentence is a frequent word or not.
