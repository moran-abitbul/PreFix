import nltk
# nltk.download('popular')
sentence = "the occupation of taking and printing photographs or making movies"


# Tokenize and tag some text:
tokens = nltk.word_tokenize(sentence)
print('tokens: ')
print(tokens)
tagged = nltk.pos_tag(tokens)
print('tagged[0:6]: ')
print(tagged[0:6])

# Identify named entities:
entities = nltk.chunk.ne_chunk(tagged)
print('entities: ')
print(entities)
