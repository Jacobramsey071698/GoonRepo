window.Charting=function Charting(dataObj){
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }

    if (document.getElementById('myChart') == null){
        const ctx = document.createElement('canvas')
        const toolTipDiv=document.getElementById('toolTipDiv')
        ctx.setAttribute('id','myChart')
        ctx.setAttribute('class','canvasD')
        const divFCanv=document.getElementById('divFCanv')
        divFCanv.insertBefore(ctx,toolTipDiv)
    }else{
        document.getElementById('myChart').remove()
        const ctx = document.createElement('canvas')
        const toolTipDiv=document.getElementById('toolTipDiv')
        ctx.setAttribute('id','myChart')
        ctx.setAttribute('class','canvasD')
        const divFCanv=document.getElementById('divFCanv')
        divFCanv.insertBefore(ctx,toolTipDiv)

    }
    const ctx = document.getElementById('myChart')  
    let labelArr=[]
    let priceArr=[]
    let barColorArr=[]
    let hoverBgCollArr=[]
    let borderBarColorArr=[]
    var dict1=new Object();
    
      
      dataObj.sort( compare );
    for (let i =0; i<dataObj.length;i++){
        let title=dataObj[i]['title']
        let split=title.split(' ')
        let titleAb=split.slice(0,3).join(' ')
        hoverBgCollArr.push(websiteColGen(dataObj[i]['website']).replace('.5','.9'))
        barColorArr.push(websiteColGen(dataObj[i]['website']))
        borderBarColorArr.push(websiteColGen(dataObj[i]['website']).replace('.5','.75'))
        labelArr.push(titleAb+" ..")
        dict1[titleAb+" .."+parseFloat(dataObj[i]['soldPrice'])]=i
        
        priceArr.push(parseFloat(dataObj[i]['soldPrice']))
    }
    const createToolTipChart =(chart)=>{
        let tooltipEl=ctx.parentNode.querySelector('.toolTipDesign')
        console.log(tooltipEl)
        if(!tooltipEl){
            tooltipEl=document.createElement('DIV')
           let imgDiv=document.createElement('DIV')
            imgDiv.setAttribute('id','divForSrc')
            imgDiv.setAttribute('class','imgC')
            tooltipEl.classList.add('toolTipDesign')
            tooltipEl.setAttribute('id','toolTipDiv')
           let tooltipUL=document.createElement('UL')
            tooltipUL.classList.add('toolTipUL')
            
            tooltipEl.appendChild(tooltipUL)
            tooltipEl.appendChild(imgDiv)
            ctx.parentNode.appendChild(tooltipEl)
            console.log(ctx.parentNode)
            
        }
        return tooltipEl
    }
    let externalTooltipHandler = (context)=>{
        console.log(context)
        const {chart, tooltip} =context
        const tooltipEl=createToolTipChart(chart);
        const tooltipUL=tooltipEl.childNodes.item(0)
        const price=context.tooltip.body[0].lines[0].split(" ").slice(-1)[0].replaceAll(",","")
        
        if(tooltip.opacity===0){
            tooltipEl.style.opacity=0;
            document.getElementById('divForSrc').style.opacity=0
            return
        }
        
        if(tooltip.body){
            const divImg=document.getElementById('divForSrc')
            while(divImg.firstChild){
                divImg.firstChild.remove();
             }
            const titleLines=tooltip.title || []
            const bodyLines=tooltip.body.map(b =>b.lines)
            const tooltipLi=document.createElement('LI')
            titleLines.forEach(element => {
                tooltipUL.appendChild(tooltipLi)
                const tooltipSpan=document.createElement('SPAN')
                tooltipLi.appendChild(tooltipSpan)
                
                const tooltipTitle=document.createTextNode(dataObj[dict1[element+price]]["title"])
                tooltipSpan.appendChild(tooltipTitle)
                
                
                
                
                const img=getSetImages(dataObj[dict1[element+price]]["image"])
                divImg.appendChild(img)

            });
        

        const tooltipBody=document.createElement('P')
        bodyLines.forEach((body,i)=>
        {
            const titles=tooltip.labelColors[i]
            
            const colorSquare=document.createElement('span')
            colorSquare.classList.add('colorSquare')
            colorSquare.style.background=titles.backgroundColor
            colorSquare.style.border=titles.borderColor
            colorSquare.style.background=titles

            const textLabel=document.createTextNode(body);
            
            tooltipBody.appendChild(colorSquare)
            tooltipBody.appendChild(textLabel)

        })
        const ULnode=tooltipEl.querySelector('ul')
        
        while(ULnode.firstChild){
            ULnode.firstChild.remove();
        }
        ULnode.appendChild(tooltipLi)
        tooltipLi.appendChild(tooltipBody)
        
        tooltipEl.style.opacity=1;
        document.getElementById('divForSrc').style.opacity=1

        
    }
    }

    let chart= new Chart(ctx, {
        type: 'bar',
        data: {
        labels: labelArr,
        datasets: [{
            label: 'price in $',
            data: priceArr,
            borderWidth: 2,
            backgroundColor: barColorArr,
            borderColor: borderBarColorArr,
            hoverBackgroundColor:hoverBgCollArr
        }]
        },
        options: {
        onHover:(Event,chartElement)=>{
            if(chartElement.length>0){
                Event.native.target.style.cursor='pointer'
                
            }else{
                Event.native.target.style.cursor='default'
            }
        },
        scales: {
            y: {
            beginAtZero: true
            }
        },
        plugins: {
            tooltip:{
                enabled:false,
                external: externalTooltipHandler
            }
        }
        }
    });
       ctx.onclick=clickHandler
    
    function clickHandler (click){
        const points=chart.getElementsAtEventForMode(click,'nearest',{ intersect : true },true)
        if (points.length){
            const firstPoint=points[0]

            const value=chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            location.href=dataObj[firstPoint.index]['links']
            
        }
    }
    
    
}

function getSetImages(imgObjText){
    let img=document.createElement('img')
    img.setAttribute('src',imgObjText)
    return img
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
function websiteColGen(Name){
    if(Name=='Amazon'){
        return 'rgba(255,195,51,.5)'
    }else if(Name=='Ebay'){
        return 'rgba(220,60,56,.5)'
    }else if(Name=='Etsy')
        return 'rgba(100,150,200,.5)'
}