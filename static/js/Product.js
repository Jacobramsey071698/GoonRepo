let rJsonPage=[]
let buttonVal;
let valueForIndex=10;
let noDoubleRequest=true;
window.onload=function(){
startingChart();
const element = document.getElementById("myBtn");
element.addEventListener("click", getPriceInfo);

function getPriceInfo() {
  if(noDoubleRequest){
    document.getElementById('myChart').remove()
    document.getElementById('sBar').remove()
    loadingAnimationCreation();
    
    let spanForButtons=document.getElementById('bar')
    let indexEl = document.getElementById("indexStuff")
    indexEl.innerHTML=""
    spanForButtons.innerHTML=""
    buttonVal=0;
    let product = document.getElementById("product").value.replaceAll(" ","+")
    console.log(product)
    let site =document.getElementById("sites").selectedOptions[0].value;

    
    let prodQuery = {
      "product":product,
      "site":site
    };


    let prodQueryJson = JSON.stringify(prodQuery);
    
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      console.log("1")
      if (this.readyState == 4 && this.status == 200) {
        let r = xhr.responseText;
        rJson = JSON.parse(r);
        console.log(rJson)
        spanForButtons.innerHTML=""
        rJsonPage=rJson
        valueForIndex=10
        document.getElementById('loading').remove()
        
        if(rJson.length>valueForIndex){
          
          Charting(rJson.slice(0,valueForIndex))
          createSideBar()
          
          
        }else{
          
          Charting(rJson)
          createSideBar()
          
          
        }
        buttonBr=breakDownData(rJsonPage,10)
        generateButtons(buttonBr)
        noDoubleRequest=true;
      
      }else if(this.readyState == 4 && this.status != 200) {
        console.log("1")
        
        window.location.replace("/error")
      }
    };

    xhr.open("POST", "/Product", true);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    console.log(noDoubleRequest)
    xhr.send(prodQueryJson);
    noDoubleRequest=false
  }

 }

}
function getVal(val){
  
  
  let seperatedData=breakDownData(rJsonPage,valueForIndex)
  if(buttonVal != null){
    console.log(buttonVal)
    let lastButton=document.getElementById(buttonVal)
    lastButton.style.backgroundColor='rgba(240,248,255,.4)'
  }
  buttonVal=val
  currButton=document.getElementById(val)
  currButton.style.backgroundColor='rgba(255,0,0,0.2)'
  
  Charting(seperatedData[val])
  
}

function breakDownData(data,bars){
  
  bigArray=[]
  start=0
  data.sort( compare );
  if(data.length>bars){
    for (i=0;i<data.length;i++){
      if((i+1)%bars==0 && i!=0){
        if(i==bars-1){
          bigArray.push(data.slice(start,i+1)) 
          start=i
        
        }else{
          bigArray.push(data.slice(start,i))
          start=i
        }
      }
      else if(i==(data.length-1)){
        bigArray.push(data.slice(start,i))
        start=i
      }
      
    } return bigArray
  } else{
    bigArray.push(data)
    return bigArray
  }
}
function generateButtons(data){
  parSpan=document.getElementById('bar')
  btnDiv=document.getElementById('buttonDiv')
  inputForResetIndex=document.createElement('input')
  inputForResetIndex.setAttribute('id','inputForReset')
  titleForResetIndex=document.createElement('title')
  titleForResetIndex.setAttribute('For','inputForReset')
  buttonForReset=document.createElement('button')
  buttonForReset.setAttribute('onclick','resetIndex()')
  inputForResetIndex.style.width='25px'

  
  if (document.getElementById('divIndSpan')==null){
    let divWSpan=document.createElement('div')
    divWSpan.setAttribute("id","divIndSpan")
    let spanTitleIndex=document.createElement('span')
    spanTitleIndex.setAttribute('id','spanIndex')
    divWSpan.appendChild(spanTitleIndex)
    btnDiv.appendChild(divWSpan)
    
    }
  let divWSpan=document.getElementById('divIndSpan')
  let spanTitleIndex=document.getElementById('spanIndex')
  let divForStuff=document.getElementById('indexStuff')
  btnDiv.setAttribute('class','divForIndexButton')
  btnDivWidth=data.length * 1.60
  btnDiv.style.width=`${btnDivWidth}%`
  btnDiv.insertBefore(divWSpan,parSpan)
  divForStuff.appendChild(inputForResetIndex)
  divForStuff.appendChild(titleForResetIndex)
  divForStuff.appendChild(buttonForReset)
  buttonForReset.innerHTML='Reset Index Bars'
  spanTitleIndex.innerHTML='ChartIndex'
  
  
  for (i=0;i<data.length;i++){
   let btn=document.createElement('button')
    btn.innerHTML=i
    btn.style.backgroundColor='rgba(240,248,255,.4)'
    btn.style.borderRadius='10px'
    btn.setAttribute('value',`${i}`)
    btn.setAttribute('id',`${i}`)
    btn.setAttribute('onclick','getVal(this.value)')
    parSpan.appendChild(btn)


  }
  
}
function compare( a, b ) {
  if ( a.soldPrice - b.soldPrice>0 ){
    return -1;
  }
  if ( a.soldPrice - b.soldPrice<0 ){
    return 1;
  }
  return 0;
}
function resetIndex(){
  
  valueForIndex=document.getElementById('inputForReset').value
  document.getElementById("bar").innerHTML=""
  document.getElementById('indexStuff').innerHTML=""
  buttonBr=breakDownData(rJsonPage,valueForIndex)
  buttonVal=0;
  generateButtons(buttonBr)
  Charting(rJsonPage)
  

}
function loadingAnimationCreation(){
  CanvDiv=document.getElementById('ld')
  divForLoadingBar=document.createElement('div')
  divForLoadingBar.setAttribute('class',"lds-ripple")
  divForLoadingBar.setAttribute('id',"loading")
  tempDiv1=document.createElement('div')
  tempDiv2=document.createElement('div')
  divForLoadingBar.appendChild(tempDiv1)
  divForLoadingBar.appendChild(tempDiv2)
  CanvDiv.appendChild(divForLoadingBar)
}
function createSideBar(){
  canvDiv=document.getElementById('divFCanv')
  sBarDiv=document.createElement('div')
  sBarDiv.setAttribute('id','sBar')
  sBarDiv.setAttribute('class','sidebar')
  headerSBar=document.createElement('h2')
  headerSBar.innerHTML="Menu"
  uL=document.createElement('ul')
  li=document.createElement('li')
  li1=document.createElement('li')
  li2=document.createElement('li')
  a=document.createElement('a')
  a.innerHTML="Select Product"
  a1=document.createElement('a')
  a2=document.createElement('a')
  a.setAttribute('href',"/selectProduct")
  a1.setAttribute('href',"#")
  a2.setAttribute('href',"#")

  li.appendChild(a)
  li1.appendChild(a1)
  li2.appendChild(a2)
  uL.appendChild(li)
  uL.appendChild(li1)
  uL.appendChild(li2)
  sBarDiv.appendChild(headerSBar)
  sBarDiv.appendChild(uL)
  canvDiv.insertBefore(sBarDiv,document.getElementById('myChart'))

}

