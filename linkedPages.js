// import {listenForClicks} from './pages.js'

export function legend(color){

    return `<div class="legend">
    <div class="legend-keys New"><span>${blipStatusDisplay('New','', color)}</span>New</div>
    <div class="legend-keys Moved"><span>${blipStatusDisplay('Moved-in','',  color)}</span> Moved in/out</div>
    <div class="legend-keys No-change"><span>${blipStatusDisplay('No-change','',color)}</span> No Change</div>
  </div>`
} 


export const header = `<div class='tech-radar-title'>
        <a href="./index.html">
            <img width='100' src="./imgs/bash-icon-black.svg"/>
        </a>
        <p class="main-title">technology radar</p>
    </div>
    <div class="single-view-nav">
    <ul> 
        <li><a href="./index.html">All</a></li>   
        <li><a href="./techniques.html">Techniques</a></li>   
        <li><a href="./platforms.html">Platforms</a></li> 
        <li><a href="./tools.html">Tools</a></li> 
        <li><a href="./lang-and-F.html">Languages and Frameworks</a></li> 
    </ul>
    </div>`

export function assemble(data, quadrantName, pageId, bgImage, color,startPos){
    
    const adopt = data.filter(item => item.evaluationPhase === 'Adopt')
    const trial = data.filter(item => item.evaluationPhase === 'Trial')
    const assess = data.filter(item => item.evaluationPhase === 'Assess')
    const hold = data.filter(item => item.evaluationPhase === 'Hold')

    const main = `
    <div class="page-container">
        ${header}
        <div class="body-container">
            <main>
                <div class="quadrant-data">
                    <aside>
                        <h2 class="color-${quadrantName}">${quadrantName}</h2>
                        <div class='phase-container'>
                            <h4 class="phase-name">Adopt</h4>
                            <div class="phases-section">${displayData(adopt)}</div>
                        </div>
                        <div class='phase-container'>
                            <h4 class="phase-name">Trial</h4>
                            <div class="phases-section">${displayData(trial)}</div>
                        </div>
                        <div class='phase-container'>
                            <h4 class="phase-name">Assess</h4>
                            <div class="phases-section">${displayData(assess)}</div>
                        </div>
                        <div class='phase-container'>
                            <h4 class="phase-name">Hold</h4>
                            <div class="phases-section">${displayData(hold)}</div>
                        </div>  
                    </aside>
                    <section>
                        ${createQuadrant(data, bgImage, color,startPos)}
                        ${legend(color)}
                    </section>
                </div>
            </main>
        </div>
    </div>
    
    `

    const renderpage = document.getElementById(pageId)
    renderpage.innerHTML = main

    listenForClicks()
    toggleDescrWithName()
}

export function createQuadrant(data, bgImage, color, startPos){
    
    return `<div class="quadrant-container">
                <img src="${bgImage}" />
                ${plotData(data, color, startPos)}
            </div>`
}

function plotData(data, color,startPos){
    
    const points = data.map(coord => {
        return `<div class="grid-item" id="${coord.id}" style="${startPos[0]}:${coord.coOrdinates[0]}px;${startPos[1]}:${coord.coOrdinates[1]}px">
           <div id='${coord.id}' class="tooltip" data-tooltip="${coord.technology}">
                ${blipStatusDisplay(coord.statusOfTechnology,coord.id, color)}
            </div>
        </div>`
    }) 
    
    return points.join('')
}

function blipStatusDisplay(status, id, color){
    if(status === 'Moved-in' || status == "Moved-out"){
        return `
        <svg width="30" height="30" focusable="false"  opacity="1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs></defs>
            <g transform="scale(0.7352941176470589)" fill="${color}"  opacity="1">
            <path opacity="1" transform="scale(1.25) translate(-3.5, -3.5)" d="M16.5 34.44c0-.86.7-1.56 1.56-1.56c8.16 0 14.8-6.64 14.8-14.8c0-.86.7-1.56 1.56-1.56c.86 0 1.56.7 1.56 1.56C36 27.96 27.96 36 18.07 36C17.2 36 16.5 35.3 16.5 34.44z"></path>
            <circle r="15" cx="18" cy="18"></circle>
            <text x="18" y="24" font-size="16px" font-style="normal" font-weight="bold" fill="white" style="text-anchor: middle; white-space: pre;">${id}</text>
            </g>
        </svg>
        `;
    } else if( status === "No-change"){
        return `
        <svg viewBox="220.885 68.247 33.088 33.088" width="33.088" height="33.088">
            <g transform="matrix(0.735294, 0, 0, 0.735294, 224.102158, 71.464325)" fill="${color}" opacity="1">
            <path opacity="1" transform="scale(1.25) translate(-3.5, -3.5)" d="M18 36C8.07 36 0 27.93 0 18S8.07 0 18 0c9.92 0 18 8.07 18 18S27.93 36 18 36zM18 3.14C9.81 3.14 3.14 9.81 3.14 18S9.81 32.86 18 32.86S32.86 26.19 32.86 18S26.19 3.14 18 3.14z"></path>
            <circle r="15" cx="18" cy="18"></circle>
            <text x="18" y="24" font-size="16px" font-style="normal" font-weight="bold" fill="white" style="text-anchor: middle; white-space: pre;">${id}</text>
            </g>
        </svg>
        `;

    }else{
        return `
        <svg width="26" height="26" focusable="false" id="techniques-svg" opacity="1">
            <g transform="scale(0.7352941176470589)" fill="${color}" opacity="1"><circle r="15" cx="18" cy="18"></circle>
              <text x="18" y="24" font-size="16px" font-style="normal" font-weight="bold" fill="white" style="text-anchor: middle;">${id}</text>
            </g>
        </svg>
        `
    }
  };

function displayData(data){
    
    const dataInfoList = data.map( dataEl => {
        return `
        <div class="data-point" id="tech-${dataEl.id}"> 
            <div id='techName-${dataEl.id}' class='tech-name-aside'>
                <p>${dataEl.id}. ${dataEl.technology}</p>
                <svg id="down-arrow-${dataEl.id}" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 1L8 8.5L1 1" stroke="#040404" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg id="up-arrow-${dataEl.id}" class="hide" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8.5L8 1L15 8.5" stroke="#040404" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
            <p id='descr-${dataEl.id}' class="description" style='display:none'>${dataEl.description}</p>
        </div>`
    }).join('')

    

    return dataInfoList

}

function toggleDescrWithName(){

    const dataPointInfo = document.querySelectorAll(".data-point")
    
    dataPointInfo.forEach( item => {

        item.addEventListener('click', (e) => {
            // console.log('here')

            const description = item.lastElementChild
            const upArrow = item.children[0].children[2]
            const downArrow = item.children[0].children[1]
   
            if(description.style.display === 'none'){
                description.style.display = 'block'
            
                
            upArrow.classList.remove('hide')
            downArrow.classList.add('hide')
                

            }else{
                description.style.display = 'none'

            upArrow.classList.add('hide')
            downArrow.classList.remove('hide')
            }


        })
    })
    
    

}

function listenForClicks(){

    const techBlips = document.querySelectorAll(".grid-item")
  
    techBlips.forEach((element) => {
      element.addEventListener('click', (e) => {
        const id = e.target.parentElement.parentElement.parentElement.id
        toggleDescription(id)
  
      })
  
    })
  
    const techNames = document.querySelectorAll(".data-point")
  
    techNames.forEach((element) => {
        element.addEventListener('click', (e) => {
        // console.log(element)    
        const arr = e.target.id.split('-')
        toggleDescription(arr[1])
      })
    })
  
  }
  
  function toggleDescription(id){
    
    const description = document.getElementById(`descr-${id}`)
    const techDataContainer = document.getElementById(`tech-${id}`)
    
  
    const upArrow = document.getElementById(`up-arrow-${id}`)
    const downArrow = document.getElementById(`down-arrow-${id}`)
    // console.log(description)
    if(description.style.display === 'none'){
      
      description.style.display = 'block'
      techDataContainer.style.backgroundColor = "#edf1f3"
      
      upArrow.classList.remove('hide')
      downArrow.classList.add('hide')
      
  
    }else{

      description.style.display = 'none'
      techDataContainer.style.backgroundColor = ""
  
      upArrow.classList.add('hide')
      downArrow.classList.remove('hide')
    }
  }
  
  

