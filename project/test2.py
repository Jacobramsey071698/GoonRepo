import urllib.request
import random
import json
from bs4 import BeautifulSoup
def getProxySendRequest(url):
    username = 'jacobramsey31'
    password = '123Qweasdzxc'
    country='US'
    entry = ('http://customer-%s-cc-%s:%s@pr.oxylabs.io:7777' %
        (username,country, password))
    query = urllib.request.ProxyHandler({
        'http': entry,
        'https': entry,
    })
    header={
        'user-agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
        }
    execute = urllib.request.build_opener(query)
    request=urllib.request.Request(url,headers=header)
    data=execute.open(request)
    readableCont=data.read()
    soup=BeautifulSoup(readableCont, "html.parser")
    return soup
