# Python3 code for preprocessing text
from operator import le
import nltk
import re
import numpy as np
import heapq
from nltk.corpus import stopwords

from nltk.tokenize import RegexpTokenizer
from nltk.stem import PorterStemmer

# preprocess the data

#text = 'In mathematics and computer science, an algorithm  is a finite sequence of well-defined instructions, typically used to solve a class of specific problems or to perform a computation. Algorithms are used as specifications for performing calculations and data processing. By making use of artificial intelligence, algorithms can perform automated deductions (referred to as automated reasoning) and use mathematical and logical tests to divert the code through various routes (referred to as automated decision-making). Using human characteristics as descriptors of machines in metaphorical ways was already practiced by Alan Turing with terms such as "memory", "search" and "stimulus".'
text = 'Data Set: Data For Learning, Examples – with or without “results” Occam’s Razor: prefer a simple model if possible'
title = 'Definitions [1]'


# Tokenize
# dataset = nltk.sent_tokenize(text)
# tokens = nltk.word_tokenize(text)


# Tokenize
# get rid of punctuation using NLTK tokenizer
tokenizer = RegexpTokenizer(r'\w+')
tokens = tokenizer.tokenize(text)


print('\ntokens before:')
print(tokens)

# Convert text to lower case
# Remove all non-word characters
# Remove all punctuations
for i in range(len(tokens)):
    tokens[i] = tokens[i].lower()
    tokens[i] = re.sub(r'\W', ' ', tokens[i])
    tokens[i] = re.sub(r'\s+', ' ', tokens[i])


print('\ntokens after remove punctuations and convert to lower case:')
print(tokens)


stopWords = set(stopwords.words('english'))

wordsFiltered = []  # array

# remove stop word from the original sentence
for w in tokens:
    if w not in stopWords:
        wordsFiltered.append(w)


print('\nwordsFiltered after remove stop word:')
print(wordsFiltered)


# # Stemming
ps = PorterStemmer()

for i in range(len(wordsFiltered)):
    word = wordsFiltered[i]
    wordsFiltered[i] = ps.stem(word)

print('\n\n\n\nafter stemming: ')
print(wordsFiltered)


# dict of part of speech
tagged = nltk.pos_tag(wordsFiltered)

print('\ndict of pos:')
print(tagged)

# # Identify named entities:
# entities = nltk.chunk.ne_chunk(tagged)

# print('\nentities: ')
# print(entities)


# Obtaining most frequent words in our text
# Creating the Bag of Words model
word2count = {}
for data in wordsFiltered:
    # words = nltk.word_tokenize(data)
    # for word in words:
    # check if the word exists in our dictionary
    if data not in word2count.keys():
        word2count[data] = 1
    else:
        word2count[data] += 1

print('\ndict/bag:')
print(word2count)


# create dics od nouns
# for element in tagged:
#     word = element[0]
#     pos = element[1]
#     if pos != 'NN' and pos != 'NNS':
#         print(word)
#         word2count.pop(word, None)  # remove word that not noun

# print('\nDict of nouns:')
# print(word2count)

# just to show the sort
# sortDict = sorted(word2count.items(), key=lambda x: x[1])
# print('\ndict after sort by value')
# print(sortDict)

freq_words = heapq.nlargest(3, word2count, key=word2count.get)

print('\nThe freq words:')
print(freq_words)
