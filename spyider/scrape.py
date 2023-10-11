import requests
from bs4 import BeautifulSoup
import pprint
import json

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
doc = BeautifulSoup(WatHtml, 'html.parser')
doc.prettify()
doc = doc.find("span", id="ctl00_contentMain_lblContent")
numberDic = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5
}

doc = doc.find("li").find_next_siblings('li')
courseRequirement = []
for section in doc:
    count = 0
    number = section.text
    for key in numberDic:
        if key in number.lower():
            count = numberDic[key]
    subsec = section.find("ul")
    courseLst = []
    try:
        courses = subsec.find_all('a')
        for course in courses:
            courseLst.append(course.text)
    except:
        courseLst = ['not found']
    courseRequirement.append([count, courseLst])

with open("/Users/zgj/Documents/GitHub/Mmerge/spyider/CourseRequirement.json", "w") as file:
    json.dump(courseRequirement, file)