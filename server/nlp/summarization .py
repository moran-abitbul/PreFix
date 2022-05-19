from nltk.tokenize import sent_tokenize
import re
import numpy as np
import pandas as pd
import nltk
nltk.download('punkt')  # one time execution


#start this codeeeeeeeeeeeeeeeeeeeee
sentences = []
for s in df['article_text']:
    sentences.append(sent_tokenize(s))

sentences = [y for x in sentences for y in x]  # flatten list
