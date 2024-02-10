import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import test2

def get_soup_retry(url,var):
    ua = UserAgent()
    uag_random = ua.random
    cookies = {
        'session-id': '145-3063110-8790731',
        'i18n-prefs': 'USD',
        'ubid-main': '133-4173666-7499624',
        'x-main': '"FO?pzhSHqWlVHiRGWvgOhJA9MWqYYa9zlRymz3xypV1jlgVZJtlxIALQfgpPse5?"',
        'at-main': 'Atza|IwEBIEhPHnyp2OsN7ZXbi4F0SyN4-b1klCAfbnuf5N1IYTS-l79_121Wwi7cxzX28HWdin-S_9OwzzzBCrAIzxEo7xLw9l67jzi9WRQRKvGF4E7e7Ni6FMqLRUmvANdhYA2sxHN_yUi9h64b7i3-AcOODpY0qFVGuh0WrCe0ibVSq_ntHGjVPRx5Ix27SqMj1Wvr8SxtBS2EhpPJSPkYPNCqaE3W',
        'sess-at-main': '"9jmrnGix8tiwwC7ftzK3o+ofhYv9bZRMOSz4mQTVzqg="',
        'sst-main': 'Sst1|PQFSmaRPMVI4Uo_cC3VAcRrlCdqUvTtvsGzHFL9qOr39ihpTMDiIZvn7Ned6dZUNVR38iwTuacA4H5-sCH3WLPouE0x_CzbHgsdTClHx4Vufylm_vbuWcpTpfdRvKQn6GkG_xkCa0wUQpUl7dlY9pHZRrfK9nEojT-ScjEbz_Zru8NCQSt1Q7-AVzPABr3cl88E74nukqZe1vTSxNTV6jQcBrIW1LIOagrTqIG1T4BGlvlrJW5GixD8WDSaj3YDQPLU_eUL3Z_IS8TOreOCybFgPznRkJXDEJ2aCpIXcW0R_JCY',
        '_rails-root_session': 'NkxkemtOVS8zbjUrN0c1enh4ckR3R3pOaXNvSWJYMGo5VlQrcmdDRzFMVXlEY0tSbGY5MWtyZ09xZ1U1V3RjeE5Mcjl3K0p2OXVqNUlrS2NFZ3RPTU1QclRvbSt6OXQwUU1QREg4SU9FQ1haemVMMXc2cHZGT2tsQ0x5cE1KVHJBbVNQellrdGFyTHovbEtwZFllNmRQUVUrQ2VTQ3pzczBTMTZNZlVQdEVMc3dGMUs0ZEt1Q0g5Q1ZNWFZpNkJ2LS1jaUd0dzRIY29QdHd2YUhnNWVIaHp3PT0%3D--dd8f37107da04c5239c351d8763bd394accec59c',
        's_fid': '51164E5FF5F2FFF4-38DDE8E5A6195BCD',
        's_cc': 'true',
        'session-id-time': '2082787201l',
        'session-token': 'oH3d0rZfWT3340hBTV0b8nM5yWkYK8FLwT6Sz71MOpMYBgzhQ5XOa9bwWKn5n8HHkX2pIj2Gdi620r2CuYD891uo4hPXo1PdbHjO3hYAtdIP+ruYQIIqyuMlyyYAafymO/lzQt3yOIcK+n0jItlhFYVrdNedhrrQlCaWOGZjAwiKfX2gale+hjmR8d3WFb+0Yf3deYZbbmJlQBH7VyY1/IihbcP9a3J8duVsCVomLd+U4XdW6pKIUF1gRoDIrGG0',
        'csm-hit': 'tb:6HTGR1Q1PHQE0JGX0NYR+s-V9SKPQPTBN4TB983MV5X|1678581617355&t:1678581617355&adb:adblk_no',
    }

    headers = {
        
        'user-agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
    }

 
    proxies={'http':var+":433",'https':var +":443"}
    
    try:
        page = requests.get(url, headers=headers,proxies=proxies,timeout=5)
        print(page)
            
        soup = BeautifulSoup(page.text, 'html.parser')
        print(soup)
    except:
        print(page)


def sendRequest(url):
    username,password="jacobramsey31","123Qweasdzxc"
    payload={
        "source":"universal",
        "url":url,
        "geo_location":"Germany"
    }
    response=requests.request(
        "POST","https://realtime.oxylabs.io/v1/queries",
        auth=(username,password),
        json=payload)
    print(response)
    response_html=response.json()['results'][0]['content']
    return BeautifulSoup( response_html,'html.parser')

var1=test2.getProxy()
#get_soup_retry('https://httpbin.org/ip',var1)