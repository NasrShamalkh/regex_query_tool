import re

def regex_query(regex, text):
    return re.search(regex, text)

text = "The rai5n in Spain"
regex = "ai"

print(regex_query(regex, text).group())
