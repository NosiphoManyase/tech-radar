let languagesAndFrameworks = []
let platforms = []
let tools = []
let techniques = []
let counter = 0
let occupiedCells = []
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


function sortData(data){
    let sortIntoQuads = data.filter(technology => {
        if(technology.quadrant === "languages and frameworks"){
            languagesAndFrameworks.push(technology)
        } else if(technology.quadrant === "platforms"){
            platforms.push(technology)
        } else if(technology.quadrant === "tools"){
            tools.push(technology)
        } else{
            techniques.push(technology)
        }
    })
} 

function checkDuplicates(randomRow, randomColumn){
    
    if(occupiedCells.length === 0){
        occupiedCells.push([randomRow, randomColumn])

    }else{
        let el = occupiedCells.find(el => el[0] === randomRow)

        if(el){
            if(el[1] === randomColumn){   
                randomColumn = randomColumnCalc()
                checkDuplicates(randomRow, randomColumn)
            }else{
                occupiedCells.push([randomRow, randomColumn])
            }
            
        }else{
            occupiedCells.push([randomRow, randomColumn])
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

count = 0
function displayDataPoints(categoryName, techId, techName){
   
    let row = ''
    if(!isSingleQuadView){
        row = document.getElementById(categoryName).getElementsByClassName(`row${randomRow}`)
    }else{
        row = document.getElementById('grid').getElementsByClassName(`row${randomRow}`)
    }
    checkDuplicates(randomRow, column)
    row[randomColumn].innerHTML += 
    `<span  class='data-point' id='data-point-${techId}'>${techId}</span>
    <span id='${techName}' class='data-name'>${techName}</span>`

    displayDescr(techName, techId)
    displayDescr()
    
}

function sortIntoQuadrants(tech){
            randomColumn = randomColumnCalc()

            if(tech.quadrant === 'languages and frameworks'){

                displayDataPoints('langAndFrameworks', tech.id, tech.technology)
                

            }else if(tech.quadrant === 'platforms'){

                displayDataPoints(tech.quadrant, tech.id, tech.technology)
        
            }else if(tech.quadrant === 'tools'){

                displayDataPoints(tech.quadrant, tech.id, tech.technology)

            }else{

                displayDataPoints(tech.quadrant, tech.id, tech.technology)

            }
            
}

// Tech Info bar function
function displayTechInfo(id, name, description, evalPhase){
    
    // insert tech names and description
    const phase = document.getElementById(`${evalPhase}`)
    phase.innerHTML += `<p class="name" id="${id}"><span>${id}.${name}</span><i id="down" class="arrow down"></i></p>
    <p class="description hide" id="descr-${id}"><br>${description}</p>`
    
}


function displayDescr(techNameId, techId){

    if(!techNameId){
        //show description when click on tech name
        const techName = document.querySelectorAll(".name").forEach(item =>{
            
            item.addEventListener('click', (e) => {

                e.preventDefault()
                descr = document.getElementById(`descr-${e.target.id}`)
                

                if(descr.classList[1] === 'hide'){      
                    descr.classList.remove("hide")
                    // replace down arrow w/ up arow on nav
                    const techName = document.getElementById(`${e.target.id}`)
                    const arrow = techName.lastChild
                    arrow.classList.remove('down')
                    arrow.classList.add('up')

                }
                else{
                    descr.classList.add('hide')
                    // replace up arrow w/ down arow on nav
                    const techName = document.getElementById(`${e.target.id}`)
                    const arrow = techName.lastChild
                    arrow.classList.remove('up')
                    arrow.classList.add('down')
                }
                
            })
        })
    } else {

        const techBlip = document.getElementById(`${techNameId}`)
        techBlip.addEventListener('click', () =>{

            descr = document.getElementById(`descr-${techId}`)
            techItem = document.getElementById(`${techId}`)
            // console.log(techNameId, techId)
            if(descr.classList[1] === 'hide'){      
                descr.classList.remove("hide")
                techItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
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

            if(!isSingleQuadView){
                randomRow = Math.floor(Math.random() * 4) + 1
                sortIntoQuadrants(tech)
            }else{
                randomRow = Math.floor(Math.random() * 5) + 1
                randomColumn = randomColumnCalc()
                //if in single quadrant view, create section to display tech blip info
                displayTechInfo(tech.id, tech.technology, tech.description, tech.evaluationPhase)
                displayDataPoints("", tech.id, tech.technology)
            }
            

        } else if (tech.evaluationPhase === 'Trial'){                 
            
            if(!isSingleQuadView){
                randomRow = 4 + Math.floor(Math.random() * 4) + 1
                sortIntoQuadrants(tech)
            }else{
                randomRow = 5 + Math.floor(Math.random() * 5) + 1
                randomColumn = randomColumnCalc()
                displayTechInfo(tech.id, tech.technology, tech.description, tech.evaluationPhase)
                displayDataPoints("", tech.id, tech.technology)
            }

        } else if (tech.evaluationPhase === 'Assess'){

            if(!isSingleQuadView){
                randomRow = 8 + Math.floor(Math.random() * 4) + 1
                sortIntoQuadrants(tech)
            }else{
                randomRow = 10 + Math.floor(Math.random() * 5) + 1
                randomColumn = randomColumnCalc()
                displayTechInfo(tech.id, tech.technology, tech.description, tech.evaluationPhase)
                displayDataPoints("", tech.id, tech.technology)
            }

        } else if(tech.evaluationPhase === 'Hold'){

            if(!isSingleQuadView){
                randomRow = 12 + Math.floor(Math.random() * 4) + 1
                sortIntoQuadrants(tech)
            }else{
                randomRow = 15 + Math.floor(Math.random() * 5) + 1
                randomColumn = randomColumnCalc()
                displayTechInfo(tech.id, tech.technology, tech.description, tech.evaluationPhase)
                displayDataPoints("", tech.id, tech.technology)
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
        quadrant.style.gridTemplateRows =  `repeat(${row}, 1fr)`
        quadrant.style.gridTemplateColumns =  `repeat(${column},1fr)`
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
