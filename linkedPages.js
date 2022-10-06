import {renderSection, toggleDescription } from './pages.js'

export function assemble(data, quadrantName, pageId, color){

    const adopt = data.filter(item => item.evaluationPhase === 'Adopt')
    const trial = data.filter(item => item.evaluationPhase === 'Trial')
    const assess = data.filter(item => item.evaluationPhase === 'Assess')
    const hold = data.filter(item => item.evaluationPhase === 'Hold')

    const main = `
    <div class="body-container">
        <main>
            <header><h1>${quadrantName}</h1></header> 
            <div class="quadrant-data">
                <aside>
                    <h4 class="phase-name">Adopt</h4>
                    <div class="phases-section">${displayData(adopt)}</div>
                    <h4 class="phase-name">Trial</h4>
                    <div class="phases-section">${displayData(trial)}</div>
                    <h4 class="phase-name">Assess</h4>
                    <div class="phases-section">${displayData(assess)}</div>
                    <h4 class="phase-name">Hold</h4>
                    <div class="phases-section">${displayData(hold)}</div>
                </aside>
                <div class="link-pages-container">${renderSection( color, data )} </div>
            </div>
        </main>
    </div>
    `

    const renderpage = document.getElementById(pageId)
    renderpage.innerHTML = main

    toggleDescription()
    toggleDescrWithName()
}

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

