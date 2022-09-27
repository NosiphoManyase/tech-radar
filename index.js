let languagesAndFrameworks = []
let platforms = []
let tools = []
let techniques = []
let occupiedCells = []
let counter = 0
let randomColumn = 0
let randomRow = 0
let column = 16
let row = 16
let isSingleQuadView = false;
let singleQuad = document.getElementsByClassName('quadrant-view')


fetch('https://tech-radar-api.herokuapp.com/tech-radar')
    .then(response => response.json())
    .then(data => {

        sortData(data) 

        // check if on single quadrant page or full tech radar page
        if(singleQuad.length>0){
            isSingleQuadView = true;
            //increase length of grid columns and row 
            column = 20
            row = 20

            const langAndFrameworksHtml = document.getElementById("langAndFrameworksQuad")
            const platformsHtml = document.getElementById("platformsQuad")
            const toolsHtml = document.getElementById("toolsQuad")
           
            if(langAndFrameworksHtml){
                createGrids("langAndFrameworksQuad")
                sortIntoPhases(languagesAndFrameworks)  
            }else if(platformsHtml){
                createGrids("platformsQuad")
                sortIntoPhases(platforms)
            }else if(toolsHtml){
                createGrids("toolsQuad")
                sortIntoPhases(tools)
            }else{
                createGrids("techniquesQuad")
                sortIntoPhases(techniques)
            }
        }else{
            createGrids()
            createGrids()
            createGrids()
            createGrids()
            sortIntoPhases(languagesAndFrameworks)  
            sortIntoPhases(platforms)
            sortIntoPhases(tools)
            sortIntoPhases(techniques)
        }

        
    })

let placeHolderNum = 0

function mapData(quadrant, data){

    // console.log(languagesAndFrameworks)
    // console.log(platforms) 
    // console.log(tools)
    // console.log(techniques)
    // console.log(data)

    const array = data.map( technology => {
        return technology.quadrant ===  quadrant? 
        {...technology, placeHolderNum:placeHolderNum += 1}: 
        technology 
    }).filter(technology => technology.quadrant === quadrant)

    console.log(array)
    return array
}

function sortData(data){
    // let counter = 0
    
    languagesAndFrameworks = mapData("languages and frameworks", data)
    platforms = mapData("platforms", data)
    tools = mapData("tools", data)
    techniques = mapData("techniques", data)

    // ********** MORE EFFICIENT METHOD TO USE ONCE ID'S ON STRAPPI ARE SORTED**********
    // platforms = data.map( technology => technology.quadrant === "platforms")
    // platforms = data.map( technology => technology.quadrant === "platforms")
    // tools = data.map( technology => technology.quadrant === "tools")
    // techniques = data.map( technology => technology.quadrant === "techniques")


    // let sortIntoQuads = data.filter(technology => {
    //     if(technology.quadrant === "languages and frameworks"){
    //         languagesAndFrameworks.push(technology)
    //     } else if(technology.quadrant === "platforms"){
    //         platforms.push(technology)
    //     } else if(technology.quadrant === "tools"){
    //         tools.push(technology)
    //     } else{
    //         techniques.push(technology)
    //     }
    // })

} 


const q1OccupiedCells=[]
const q2OccupiedCells=[]
const q3OccupiedCells=[]
const q4OccupiedCells=[]



function checkDuplicates(quadrant){

    let dupRow = []

    if(quadrant === 'languages and frameworks'){
        dupRow = q1OccupiedCells.filter(el => {
            if(el[0] === randomRow){return el[1] }
        })
        checkColumn()
        q1OccupiedCells.push([randomRow, randomColumn])

    }else if(quadrant === 'platforms'){
        dupRow = q2OccupiedCells.filter(el => {
            if(el[0] === randomRow){return el[1] }
        })
        dupRow.length>0?console.log(dupRow):''
        checkColumn()
        q2OccupiedCells.push([randomRow, randomColumn])

    }else if(quadrant === 'tools'){
        dupRow = q3OccupiedCells.filter(el => {
            if(el[0] === randomRow){return el[1] }
        })
        checkColumn()
        q3OccupiedCells.push([randomRow, randomColumn])
        
    }else {
        dupRow = q4OccupiedCells.filter(el => {
            if(el[0] === randomRow){return el[1] }
        })
        checkColumn()
        q4OccupiedCells.push([randomRow, randomColumn])
        
    }  

    function checkColumn(){
        // console.log(quadrant)
        // dupRow.length>0?console.log(dupRow):''
        if(dupRow.length>0){
            let dupColumn = dupRow.filter( coOrd => coOrd[1] === randomColumn)
            if(dupColumn.length>0){ 
                
                console.log(randomRow,randomColumn)
                console.log('recalc randomColumn') 
                randomColumn = randomColumnCalc()
                checkColumn()
            }else{
                // console.log(dupRow, `[${randomRow}, ${randomColumn}]` )
            }
        }
    }    
 
}

function randomColumnCalc(){
    let num = 0
    if(isSingleQuadView){
        num = 20
    }else{
        num = 16
    }
    const randomColumn = Math.floor(Math.random() * num)
    return randomColumn
}


function displayDataPoints(categoryName, techId, techName, techStatus, quadrant){

    let row = ''
    if(!isSingleQuadView){
        row = document.getElementById(categoryName).getElementsByClassName(`row${randomRow}`)
    }else{
        row = document.getElementById('grid').getElementsByClassName(`row${randomRow}`)
    }
    
    checkDuplicates(quadrant)
    row[randomColumn].innerHTML += 
    `<div  class='${techStatus} status ' id='data-point-${techId}'><span class='data-point'>${techId}</span></div>
    <span id='${techName}' class='data-name'>${techName}</span>`

    displayDescr(techName, techId)
    displayDescr()
    
}


// see if can refactor into sortintophases?
function sortIntoQuadrants(tech){

            // ************** switched tech.id tech.placeHolderNum
            
            randomColumn = randomColumnCalc()

            if(tech.quadrant === 'languages and frameworks'){

                displayDataPoints('langAndFrameworks', tech.placeHolderNum, tech.technology, tech.statusOfTechnology, tech.quadrant)
                

            }else if(tech.quadrant === 'platforms'){

                displayDataPoints(tech.quadrant, tech.placeHolderNum, tech.technology, tech.statusOfTechnology, tech.quadrant)
        
            }else if(tech.quadrant === 'tools'){

                displayDataPoints(tech.quadrant, tech.placeHolderNum, tech.technology, tech.statusOfTechnology, tech.quadrant)

            }else{

                displayDataPoints(tech.quadrant, tech.placeHolderNum, tech.technology, tech.statusOfTechnology, tech.quadrant)

            }
            
}

// Tech Info bar function
function displayTechInfo(id, name, description, evalPhase){
    // insert tech names and description
    const phase = document.getElementById(`${evalPhase}`)
    phase.innerHTML += `<div class="name" id="tech-${id}">
    <div class="always-visible">
        <p><span>${id}.</span>${name}</p>
        <svg class="down-arrow" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 1L8 8.5L1 1" stroke="#040404" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="up-arrow hide" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 8.5L8 1L15 8.5" stroke="#040404" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <p class="description hide">${description}</p>
    </div>`
    
}


function displayDescr(techNameId, techId){
    

    if(!techNameId){
        //show description when click on tech name
        const techName = document.querySelectorAll(".name").forEach(item =>{
            
            item.addEventListener('click', (e) => {
                e.preventDefault()
                // console.log(e.target)

                const techName = item.firstElementChild
                const down = techName.children[1]
                const up = techName.lastElementChild

                // descr = document.getElementById(`descr-${e.target.id}`)
                descr = item.lastElementChild

                if(descr.classList[1] === 'hide'){ 
                    // console.log('yes')
                    descr.classList.remove("hide")
                    // replace down arrow w/ up arow on nav
                    down.classList.add('hide')
                    up.classList.remove('hide')

                }
                else{
                    descr.classList.add('hide')
                    // replace up arrow w/ down arow on nav
                    up.classList.add('hide')
                    down.classList.remove('hide')
                }
                
            })
        })
    } else {

        const techBlip = document.getElementById(`${techNameId}`)
        techBlip.addEventListener('click', () =>{

            const techName = document.getElementById(`tech-${techId}`)
            const descr = techName.lastElementChild
            // techItem = document.getElementById(`${techId}`)
            // console.log(techNameId, techId)
            if(descr.classList[1] === 'hide'){      
                descr.classList.remove("hide")
                descr.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
            }
            else{
                descr.classList.add('hide')
            }
        })
    }

    
}

function sortIntoPhases(quadrantData){

    const sortIntoPhase = quadrantData.filter(tech => {
        if(tech.evaluationPhase === 'Adopt'){

            // if it is landing page w/ all quadrants, sort into quadrants first
            if(!isSingleQuadView){
                randomRow = Math.floor(Math.random() * 4) + 1
                sortIntoQuadrants(tech)
            }else{
                randomRow = Math.floor(Math.random() * 5) + 1
                randomColumn = randomColumnCalc()
                //if in single quadrant view, create section to display tech blip info
                displayTechInfo(tech.placeHolderNum, tech.technology, tech.description, tech.evaluationPhase)
                displayDataPoints("", tech.placeHolderNum, tech.technology, tech.statusOfTechnology, tech.quadrant)
            }

        } else if (tech.evaluationPhase === 'Trial'){                 
            
            if(!isSingleQuadView){
                randomRow = 4 + Math.floor(Math.random() * 4) + 1
                sortIntoQuadrants(tech)
            }else{
                randomRow = 5 + Math.floor(Math.random() * 5) + 1
                randomColumn = randomColumnCalc()
                displayTechInfo(tech.placeHolderNum, tech.technology, tech.description, tech.evaluationPhase)
                displayDataPoints("", tech.placeHolderNum, tech.technology, tech.statusOfTechnology, tech.quadrant)
            }

        } else if (tech.evaluationPhase === 'Assess'){

            if(!isSingleQuadView){
                randomRow = 8 + Math.floor(Math.random() * 4) + 1
                sortIntoQuadrants(tech)
            }else{
                randomRow = 10 + Math.floor(Math.random() * 5) + 1
                randomColumn = randomColumnCalc()
                displayTechInfo(tech.placeHolderNum, tech.technology, tech.description, tech.evaluationPhase)
                displayDataPoints("", tech.placeHolderNum, tech.technology, tech.statusOfTechnology, tech.quadrant)
            }

        } else if(tech.evaluationPhase === 'Hold'){

            if(!isSingleQuadView){
                randomRow = 12 + Math.floor(Math.random() * 4) + 1
                sortIntoQuadrants(tech)
            }else{
                randomRow = 15 + Math.floor(Math.random() * 5) + 1
                randomColumn = randomColumnCalc()
                displayTechInfo(tech.placeHolderNum, tech.technology, tech.description, tech.evaluationPhase)
                displayDataPoints("", tech.placeHolderNum, tech.technology, tech.statusOfTechnology, tech.quadrant)
            }
            
            
        }
        
    })

    
}

function mountGrids(quadrantName, cellsArrayHtml){
    if(isSingleQuadView){
        const quadrant = document.getElementById('grid')
        quadrant.innerHTML += cellsArrayHtml
        quadrant.style.gridTemplateRows =  `repeat(${row}, 1fr)`
        quadrant.style.gridTemplateColumns =  `repeat(${column},1fr)`
        

    }else{
        const quadrant = document.getElementById(`${quadrantName}`)
        quadrant.innerHTML = cellsArrayHtml
        quadrant.style.gridTemplateRows =  `repeat(${row}, 30px)`
        quadrant.style.gridTemplateColumns =  `repeat(${column},30px)`
    }
}

function createGrids(quadName){
    let count = 0
    let innerGrid = ''
    let cellsArray = new Array(column)

    for(let i = 0; i<row; i++){
        cellsArray[i] = new Array(row)

        let num = 0
        //num = number of rows for each evaluation phase
        if(!isSingleQuadView){
            num = 4
        }else{
            num = 5
            innerGrid = "-inner"
        }
        
        if(i<num){
            cellsArray[i].fill(`<div class="grid-item${innerGrid} row${count+=1} adopt"></div>`)
        }else if(i<(num*2)){
            cellsArray[i].fill(`<div class="grid-item${innerGrid} row${count+=1} trial"></div>`)
        }else if(i<(num*3)){
            cellsArray[i].fill(`<div class="grid-item${innerGrid} row${count+=1} assess"></div>`)
        }else{
            cellsArray[i].fill(`<div class="grid-item${innerGrid} row${count+=1} hold"></div>`)
        }
    }

    let cells1dArray = []
    
    
    //convert nested arrays then array to string
    cellsArray.forEach(innerArray => cells1dArray.push(`${innerArray.join('\n')}`))
    let cellsArrayHtml = cells1dArray.join('\n')
    
    if(isSingleQuadView){
        mountGrids(quadName, cellsArrayHtml)
    } else{
        mountGrids("langAndFrameworks", cellsArrayHtml)
        mountGrids("platforms", cellsArrayHtml)
        mountGrids("tools", cellsArrayHtml)
        mountGrids("techniques", cellsArrayHtml)
    }
    
      
}
