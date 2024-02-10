from flask import Flask,render_template
from flask import request
from project import priceSearch
from project import test2
import json



myApp = Flask(__name__)

@myApp.route("/")
def home():
    return render_template("index2.html")

#@myApp.errorhandler(Exception)
#def handleError(e):
#    return render_template("errorPage.html")
@myApp.route("/error", methods=['get'])
def error():
    return render_template("errorPage.html")

@myApp.route("/selectProduct", methods=['get'])
def selectProduct():
    return render_template("selectProduct.html")

@myApp.route("/Product", methods=['POST'])
def Product():
    
    data=request.json
    keyWordObj=priceSearch.Product(data['product'])
    
    
    if(data['site']=='ebay'):
        data1=test2.getProxySendRequest(keyWordObj.keywordEbay)
        temp=keyWordObj.parseStuffEbay(data1)
        json_new=json.dumps(temp)
        return json_new
    elif(data['site']=='amzn'):
        data1=test2.getProxySendRequest(keyWordObj.keywordAmazon)
        
        temp=keyWordObj.parseStuffAmazon(data1)
        

        json_new=json.dumps(temp)
        
        return json_new
    elif(data['site']=='etsy'):
        data1=test2.getProxySendRequest(keyWordObj.keywordEtsy)
        
        temp=keyWordObj.parseEtsy(data1)
        print(temp)
        json_new=json.dumps(temp)
        return json_new
    else:
        data1=test2.getProxySendRequest(keyWordObj.keywordAmazon)
        data2=test2.getProxySendRequest(keyWordObj.keywordEbay)
        data3=test2.getProxySendRequest(keyWordObj.keywordEtsy)
        keyWordObj.parseStuffAmazon(data1)
        keyWordObj.parseStuffEbay(data2)
        keyWordObj.parseEtsy(data3)
        keyWordObj.removeDups()

        json_new=json.dumps(keyWordObj.allProducts)
        return json_new

if __name__=='__main__':
    myApp.run()
