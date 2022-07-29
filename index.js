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
let isSingleQuadView = false



fetch('https://tech-radar-api.herokuapp.com/tech-radar')
    .then(response => response.json())
    .then(data => {
        
        sortData(data) 
        createGrids()
        createGrids()
        createGrids()
        createGrids()
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
    const randomColumn = Math.floor(Math.random() * 16)
    return randomColumn
}

function displayDataPoints(divId, techPlaceholder, techName){
    let row = ''
    row = document.getElementById(divId).getElementsByClassName(`row${randomRow}`)
    checkDuplicates(randomRow, column)
    row[randomColumn].innerHTML += 
    `<span class='data-point'>${techPlaceholder}</span>
    <span class = 'data-name'>${techName}</span>`
}

function sortIntoQuadrants(tech){

            randomColumn = randomColumnCalc()

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

function mountGrids(quadrantName, cellsArrayHtml){
    const quadrant = document.getElementById(`${quadrantName}`)
    quadrant.innerHTML = cellsArrayHtml
    quadrant.style.gridTemplateRows =  `repeat(${row}, 1fr)`
    quadrant.style.gridTemplateColumns =  `repeat(${column},1fr)`
}

function createGrids(){
    let count = 0
    
    let cellsArray = new Array(column)

    for(let i = 0; i<row; i++){
        cellsArray[i] = new Array(row)

        let num = 0
        if(!isSingleQuadView){
            num = 4
        }else{
            num = 15
        }
        
        if(i<num){
            cellsArray[i].fill(`<div class="grid-item row${count+=1} adopt"></div>`)
        }else if(i<(num*2)){
            cellsArray[i].fill(`<div class="grid-item row${count+=1} trial"></div>`)
        }else if(i<(num*3)){
            cellsArray[i].fill(`<div class="grid-item row${count+=1} assess"></div>`)
        }else{
            cellsArray[i].fill(`<div class="grid-item row${count+=1} hold"></div>`)
        }
    }
    let cells1dArray = []
    
    
    //convert nested arrays then array to string
    cellsArray.forEach(innerArray => cells1dArray.push(`${innerArray.join('\n')}`))
    let cellsArrayHtml = cells1dArray.join('\n')
    
    mountGrids("langAndFrameworks", cellsArrayHtml)
    mountGrids("platforms", cellsArrayHtml)
    mountGrids("tools", cellsArrayHtml)
    mountGrids("techniques", cellsArrayHtml)
      
}

function update(){

}

function singleView(){
    let singleQuad = document.getElementById('langAndFrameworks')

    singleQuad.addEventListener('click', ()=> {
        isSingleQuadView = true
        column = 60
        row = 60
        createGrids()
    })
        
    
}
