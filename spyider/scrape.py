import requests
from bs4 import BeautifulSoup
import pprint

pp = pprint.PrettyPrinter()
upperUrl = "https://ugradcalendar.uwaterloo.ca/page/MATH-List-of-Academic-Programs-or-Plans"
UrlDic = {
    "AScience": "https://ugradcalendar.uwaterloo.ca/page/MATH-Actuarial-Science1",
    "AMath": "https://ugradcalendar.uwaterloo.ca/page/MATH-AM-Degree-Requirements-Applied-Mathematics",
    "BStats": "https://ugradcalendar.uwaterloo.ca/page/MATH-Biostatistics1",
    "CS": "https://ugradcalendar.uwaterloo.ca/page/MATH-Bachelor-of-Computer-Science-1",
    "CO": "https://ugradcalendar.uwaterloo.ca/page/MATH-Combinatorics-and-Optimization2",
    "CM": "https://ugradcalendar.uwaterloo.ca/page/MATH-Computational-Mathematics1",
    "DS": "https://ugradcalendar.uwaterloo.ca/page/MATH-Data-Science1",
    "ME": "https://ugradcalendar.uwaterloo.ca/page/MATH-Mathematical-Economics-Degree-Requirements",
    "MF": "https://ugradcalendar.uwaterloo.ca/page/MATH-Actuarial-Science-Mathematical-Finance1",
    "MO": "https://ugradcalendar.uwaterloo.ca/page/MATH-Mathematical-Optimization1",
    "MPhysics": "https://ugradcalendar.uwaterloo.ca/page/MATH-AM-Degree-Requirements-Mathematical-Physics",
    "Stat": "http://ugradcalendar.uwaterloo.ca/page/MATH-Statistics1",
    "PMath": "https://ugradcalendar.uwaterloo.ca/page/MATH-Pure-Mathematics1",
    "MTeaching": "https://ugradcalendar.uwaterloo.ca/page/MATH-Mathematics-Teaching-co-op"
}

WatHtml = requests.get(UrlDic["CO"]).text
soup = BeautifulSoup(WatHtml, 'html.parser')
soup.prettify()
soup = soup.find("span", id="ctl00_contentMain_lblContent")
numberDic = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5
}
with open("/Users/zgj/Documents/GitHub/Mmerge/spyider/course.html", "w", encoding="utf-8") as file:
    file.write(str(soup))
def extract(soup):
    outer_list_items = soup.find_all('li')
    result = []

    for item in outer_list_items:
        if 'One of' in item.text:
            count = 1
        elif 'Three of' in item.text:
            count = 3
        else:
            continue

        courses = [a.text.strip() for a in item.find_next('ul').find_all('a')]
        result.append([count, courses])

    return result

pp.pprint(extract(soup))

