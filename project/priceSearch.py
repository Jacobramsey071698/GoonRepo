
from apiclient.discovery import build
import requests
from bs4 import BeautifulSoup
import numpy as np
#import test2


class Product:
    def __init__(self,prod):
        
        self.prod=prod
        self.apiKey='AIzaSyAjJyBlttl002ewPY27ZVTXoRaNYu1VR6o'
        self.keywordEbay=f"https://www.ebay.com/sch/i.html?_nkw={prod}&LH_Complete=1&LH_Sold=1&_pgn=1"
        self.keywordAmazon=f"https://www.amazon.com/s?k={prod}&page=1"
        self.keywordEtsy=f"https://www.etsy.com/search?q={prod}&ref=search_bar"
        self.allProducts=[]
        
        
        

    def dataFetch(self,URL):
        header={
            "Accept":" */*",
            "Accept-Encoding":" gzip, deflate, br",
            "Accept-Language":" en-US,en;q=0.9",
            "Connection":" keep-alive",
            "Content-Length":"204",
            "Content-Type":" application/json",
            "Origin":" https",
            "Referer":" https",
            "sec-ch-ua-mobile":" ?0",
            "sec-ch-ua-platform": "Windows",
            "Sec-Fetch-Dest":" empty",
            "Sec-Fetch-Mode":" cors",
            "Sec-Fetch-Site":" cross-site",
            "User-Agent":" Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
            }
        r=requests.get(url=URL,headers=header)
        
        print(r)
        dataD=BeautifulSoup(r.text,'html.parser')
        
        return dataD

    def parseStuffEbay(self,dataD):
        
        parsed=dataD.find_all('div',{'class':'s-item__wrapper clearfix'})
        for record in parsed:
            if record.find('span',{'class':'s-item__price'}).find('span',{'class':'POSITIVE'}):
                product={
                    'website':'Ebay',
                    'title': record.find('span',{'role':'heading'}).text,
                    'soldPrice':record.find('span',{'class':'s-item__price'}).find('span',{'class':'POSITIVE'}).text.strip().replace('$','').replace(',',''),
                    'soldDate':record.find('div',{'class':'s-item__title--tagblock'}).find('span',{'class':'POSITIVE'}).text.strip(),
                    'bids':str(record.find('span',{'class':'s-item__bids s-item__bidCount'})),
                    'links':record.find('a', {'class':'s-item__link'})['href'],
                    'image':record.find('div',{'class':"s-item__image-wrapper image-treatment"}).find('img')['src']
                }
                
                self.allProducts.append(product)
        
        
        return self.allProducts

    def parseStuffAmazon(self,dataD):
        dataDstuff={}
        parsed=dataD.find_all('div',{'class':'s-card-container s-overflow-hidden aok-relative puis-expand-height puis-include-content-margin puis s-latency-cf-section s-card-border'})
        
        if parsed == []:
            parsed=dataD.select('div[class*="s-card-container s-overflow-hidden aok-relative puis"]')
        print(parsed) 
        self.routeAmazonRequest(parsed,dataDstuff)
       
                       
                       
                        
                    
                    
        return self.allProducts
    def parseEtsy(self,dataD):
        parsed=dataD.find_all('div',{'class':'wt-height-full'})
        print(parsed)
        for record in parsed:
            if record.select_one('h3[class*="wt-text-caption v2-listing-card"]'):
                product={
                        'website':'Etsy',
                        'title': record.select_one('h3[class*="wt-text-caption v2-listing-card"]').get_text().replace("\n","").strip(),
                        'soldPrice':record.find('span',{'class':'currency-value'}).text,
                        'soldDate':'not available',
                        'bids':'not available',
                        'links':record.select_one('a[class*="listing-link wt-display-inline-block"]')['href'],
                        'image':record.find('div',{'class':"height-placeholder"}).find('img')['src']
                    }
                
                self.allProducts.append(product)
        
        
        return self.allProducts

    def routeAmazonRequest(self,parsed,dataDstuff):
        for record in parsed:
            
             if record.find('span',{'class':'a-price-whole'})!=None:
                    soldPrice=str(record.find('span',{'class':'a-price-whole'}))
                    decimal=str(record.find('span',{'class':'a-price-fraction'}))
                    indexPriceG=soldPrice.index('>')
                    indexPriceL=soldPrice[1:].index('<')
                    indexPriceGDec=decimal.index('>')
                    indexPriceLDec=decimal[1:].index('<')
                    sPrice=soldPrice[indexPriceG+1:indexPriceL+1]+'.'+decimal[indexPriceGDec+1:indexPriceLDec+1]
                    sPrice=sPrice.replace(",","")    
                    product={
                        'website':'Amazon',
                        'title': str(record.select_one('span[class*="a-color-base a-text-normal"]').get_text()),
                        'soldPrice':sPrice,
                        'soldDate':"no data",
                        'bids':"no data",
                        'links':"https://www.amazon.com"+record.find('a', {'class':'a-link-normal s-no-outline'})['href'],
                        'image':record.find('img')['src']
                        }
                    if dataDstuff.get(product["title"])==None:
                        self.allProducts.append(product)
                        dataDstuff[product["title"]]=1
                    
        return self.allProducts
    
    def removeDups(self):
        prodList=self.allProducts
        seen = set()
        new_l = []
        for d in prodList:
            t = tuple(d.items())
            if t not in seen:
                seen.add(t)
                new_l.append(d)
        self.allProducts=new_l

        
        
#keyWordObj=Product("hats") 
#data1=test2.getProxySendRequest(keyWordObj.keywordEtsy)
#temp=keyWordObj.parseEtsy(data1)
#print(temp)          
                
        

