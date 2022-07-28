let languagesAndFrameworks = []
let platforms = []
let tools = []
let techniques = []
let counter = 0
let occupiedCells = []
let column = 0
let randomRow = 0
console.log(techniques)

fetch('https://tech-radar-api.herokuapp.com/tech-radar')
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sortData(data) 
        createGrids("platforms")
        createGrids("langAndFrameworks")
        createGrids("tools")
        createGrids("techniques")
        sortIntoPhases(languagesAndFrameworks)  
        sortIntoPhases(platforms)
        sortIntoPhases(tools)
        sortIntoPhases(techniques)
    })


function sortData(data){
    let sortIntoQuads = data.filter(technology => {
        if(technology.quadrant === "languages and frameworks"){
            technology.techPlaceholderNum = counter += 1
            languagesAndFrameworks.push(technology)
        } else if(technology.quadrant === "platforms"){
            technology.techPlaceholderNum = counter += 1
            platforms.push(technology)
        } else if(technology.quadrant === "tools"){
            technology.techPlaceholderNum = counter += 1
            tools.push(technology)
        } else{
            technology.techPlaceholderNum = counter += 1
            techniques.push(technology)
        }
    })
} 

function checkDuplicates(randomRow, column){
    
    if(occupiedCells.length === 0){
        occupiedCells.push([randomRow, column])

    }else{
        let el = occupiedCells.find(el => el[0] === randomRow)

        if(el){
            if(el[1] === column){   
                column = randomColumn()
                checkDuplicates(randomRow, column)
            }else{
                occupiedCells.push([randomRow, column])
            }
            
        }else{
            occupiedCells.push([randomRow, column])
        }
        
    }
}

function randomColumn( ){
    const randomColumn = Math.floor(Math.random() * 16)
    return randomColumn
}

function displayDataPoints(divId, techPlaceholder, techName){
    console.log(techPlaceholder)
    let row = ''
    row = document.getElementById(divId).getElementsByClassName(`row${randomRow}`)
    checkDuplicates(randomRow, column)
    row[column].innerHTML += 
    `<span class='data-point'>${techPlaceholder}</span>
    <span class = 'data-name'>${techName}</span>`
}

function sortIntoQuadrants(tech){

            column = randomColumn()

            if(tech.quadrant === 'languages and frameworks'){

                displayDataPoints('langAndFrameworks', tech.techPlaceholderNum, tech.technology)
                

            }else if(tech.quadrant === 'platforms'){

                displayDataPoints(tech.quadrant, tech.techPlaceholderNum, tech.technology)
        
            }else if(tech.quadrant === 'tools'){

                displayDataPoints(tech.quadrant, tech.techPlaceholderNum, tech.technology)

            }else{

                displayDataPoints(tech.quadrant, tech.techPlaceholderNum, tech.technology)

            }
            
}

function sortIntoPhases(quadrantData){

    const sortIntoPhase = quadrantData.filter(tech => {
        if(tech.evaluationPhase === 'Adopt'){

            randomRow = Math.floor(Math.random() * 4) + 1

            sortIntoQuadrants(tech)

        } else if (tech.evaluationPhase === 'Trial'){
            
            randomRow = 4 + Math.floor(Math.random() * 4) + 1
            
            sortIntoQuadrants(tech)

        } else if (tech.evaluationPhase === 'Assess'){
            randomRow = 8 + Math.floor(Math.random() * 4) + 1

            sortIntoQuadrants(tech)

        } else if(tech.evaluationPhase === 'Hold'){
            randomRow = 12 + Math.floor(Math.random() * 4) + 1

            sortIntoQuadrants(tech)
            
        }
        
    })
    
}

function createGrids(quadrantName){

    const column = 16
    const row = 16
    let count = 0
    
    let cellsArray = new Array(column)

    for(let i = 0; i<row; i++){
        cellsArray[i] = new Array(row)
        
        if(i<4){
            cellsArray[i].fill(`<div class="grid-item ${quadrantName} row${count+=1} adopt"></div>`)
        }else if(i<8){
            cellsArray[i].fill(`<div class="grid-item ${quadrantName} row${count+=1} trial"></div>`)
        }else if(i<12){
            cellsArray[i].fill(`<div class="grid-item ${quadrantName} row${count+=1} assess"></div>`)
        }else{
            cellsArray[i].fill(`<div class="grid-item ${quadrantName} row${count+=1} hold"></div>`)
        }
    }

    let cells1dArray = []
    
    
    //convert nested arrays then array to string
    cellsArray.forEach(innerArray => cells1dArray.push(`${innerArray.join('\n')}`))
    let cellsArrayHtml = cells1dArray.join('\n')
    

    const langAndFrameworks = document.getElementById('langAndFrameworks')
    langAndFrameworks.innerHTML = cellsArrayHtml
    langAndFrameworks.style.gridTemplateRows =  `repeat(${row}, 1fr)`
    langAndFrameworks.style.gridTemplateColumns =  `repeat(${column},1fr)`

    if (quadrantName === 'platforms'){
        const platformsQuad = document.getElementById('platforms')
        platformsQuad.innerHTML = cellsArrayHtml
        platformsQuad.style.gridTemplateRows =  `repeat(${row}, 1fr)`
        platformsQuad.style.gridTemplateColumns =  `repeat(${column},1fr)`
    }else if(quadrantName === 'tools'){
        const toolsQuad = document.getElementById('tools')
        toolsQuad.innerHTML = cellsArrayHtml
        toolsQuad.style.gridTemplateRows =  `repeat(${row}, 1fr)`
        toolsQuad.style.gridTemplateColumns =  `repeat(${column},1fr)`
    }else{
        const techniquesQuad = document.getElementById('techniques')
        techniquesQuad.innerHTML = cellsArrayHtml
        techniquesQuad.style.gridTemplateRows =  `repeat(${row}, 1fr)`
        techniquesQuad.style.gridTemplateColumns =  `repeat(${column},1fr)`
    }
    


    return cellsArray
}

