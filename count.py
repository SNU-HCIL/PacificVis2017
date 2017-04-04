#!/usr/bin/python

import csv
from collections import defaultdict
import operator
import pprint


def main():
  authors_count = defaultdict(int)
  countries_count = defaultdict(int)
  keywords_count = defaultdict(int)
  papers = []

  pp = pprint.PrettyPrinter(indent=4)

  with open('merged.csv') as csvfile:
    reader = csv.reader(csvfile)
    i = -1
    for row in reader:
      i += 1
      if i == 0:
        continue

      year = int(row[2].strip())
      title = row[3]
      abstract = row[4]
      authors = set(map(lambda x: x.strip(), row[5].split(';')))
      keywords = set(map(lambda x: x.strip(), row[7].split(';')))
      citation = int(row[10].strip())
      countries = set(map(lambda x: x.strip(), row[12].split(';')))

      for author in authors:
        authors_count[author] += 1

      for country in countries:
        countries_count[country] += 1

      for keyword in keywords:
        keywords_count[keyword] += 1

      papers.append({
        'title': title,
        'authors': authors,
        'citation': citation
      })

  pp.pprint(sorted(papers, key=lambda x: x['citation'], reverse = True)[:5])
  pp.pprint(sorted(authors_count.items(), key=operator.itemgetter(1), reverse=True)[:10])
  pp.pprint(sorted(countries_count.items(), key=operator.itemgetter(1), reverse=True)[:10])
  pp.pprint(sorted(keywords_count.items(), key=operator.itemgetter(1), reverse=True)[:10])


if __name__ == "__main__":
  main()
