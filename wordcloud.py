#!/usr/bin/python
import sys
import re
from itertools import groupby
from operator import itemgetter
from collections import Counter
import pandas as pd
import nltk
import json
import string

if __name__ == "__main__":
    df = pd.read_csv(sys.argv[1], encoding='utf-8')
    tokens = re.split(';|,', df['IEEEKeyword'].str.cat(sep=';'))
    
    with open('keywordcount.txt', 'w') as outfile:
        outfile.write(' '.join(tokens))

    c = Counter(tokens)
    wordcount = {}
    wordcount['keyword'] = [{'text': t.strip(), 'count': v} for t,v in c.items()]

    stopwords = set(nltk.corpus.stopwords.words('english'))
    punctuations = set(string.punctuation)
    text = df['Abstract'].str.cat(sep=' ').lower()
    tokens = nltk.regexp_tokenize(text, pattern='\w+|\$[\d\.]+|\S+')
    tokens = [i for i in tokens if i not in stopwords and i not in punctuations and i.isalpha()]

    lemmatizer = nltk.stem.WordNetLemmatizer()
    lemmas = [lemmatizer.lemmatize(s) for s in tokens]

    c = Counter(lemmas)
    wordcount['abstract'] = [item for item in c.items() if item[1] > 10]

    # with open('wordcount.json', 'w') as outfile:
    #     json.dump(wordcount, outfile)

    # with open('keywordcount.txt', 'w') as outfile:
    #     outfile.writelines(["{0}\t{1}\n".format(item['text'], item['count']) for item in sorted(wordcount['keyword'], key=itemgetter('count'), reverse=True)])

    with open('abstractcount.txt', 'w') as outfile:
        #outfile.writelines(["{0}\t{1}\n".format(item['text'], item['count']) for item in sorted(wordcount['keyword'], key=itemgetter('count'), reverse=True)])
        outfile.write(' '.join(lemmas))