from bs4 import BeautifulSoup
import pprint

pp = pprint.PrettyPrinter()
with open("/Users/zgj/Documents/GitHub/Mmerge/spyider/course.html","r") as file:
    doc = BeautifulSoup(file, "html.parser")

numberDic = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5
}

doc = doc.find("li")
print(type(doc))
print(type(doc.find_next_siblings("li")))
doc = [doc] + doc.find_next_siblings("li")
courseRequirement = []
for section in doc:
    count = 0
    number = section.text
    for key in numberDic:
        if key in number.lower():
            count = numberDic[key]
    subsec = section.find_all("ul")
    courseLst = []
    try:
        courses = subsec.find_all('a')
        for course in courses:
            courseLst.append(course.text)
    except:
        courseLst = ['not found']
    courseRequirement.append([count, courseLst])



