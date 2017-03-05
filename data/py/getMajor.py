import lxml
from lxml import html
import requests
import json
import re
from bs4 import BeautifulSoup

def pretty(text):

	# strip any spaces, newlines, tabs
	text = text.strip(' \t\n\r ')
	while "  " in text:
		text = re.sub('  ', ' ', text)
	while (re.search('[\t\n\r]', text) != None):
		text = re.sub('[\t\n\r]', '', text)

	# remove or replace any non ascii, non visible char
	text = re.sub(u'\u2014', '-', text)
	text = "".join(i for i in text if ord(i)<128)

	return text

url = "http://www.ucsd.edu/catalog/front/IntroDM.html"
page = requests.get(url)
soup = BeautifulSoup(page.content, 'lxml')
soup = soup.find("div", {"id": "content"})
majors = []

for major in soup.find_all("li"):
	majors.append(pretty(major.text))

f = open("../json/majors.json", "w")
json.dump(majors, f)
f.close()



	