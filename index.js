let languagesAndFrameworks = []
let platforms = []
let tools = []
let techniques = []
let counter = 0
let occupiedCells = []


fetch('https://tech-radar-api.herokuapp.com/tech-radar')
    .then(response => response.json())
    .then(data => {
        console.log(data)
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
            }else{
                occupiedCells.push([randomRow, column])
            }
            
        }else{
            occupiedCells.push([randomRow, column])
        }
        
    }
    console.log(occupiedCells)
    return occupiedCells

}

function randomColumn( ){
    const randomColumn = Math.floor(Math.random() * 16)
    return randomColumn
}

function mountPhasesToQuadGrid(tech, randomRow){

    let row = ''
            const column = randomColumn()

            if(tech.quadrant === 'languages and frameworks'){
                
                row = document.getElementById('langAndFrameworks').getElementsByClassName(`row${randomRow}`)
                row[column].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`

            }else if(tech.quadrant === 'platforms'){
        
                row = document.getElementById('platforms').getElementsByClassName(`row${randomRow}`)
                row[column].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`

            }else if(tech.quadrant === 'tools'){
        
                row = document.getElementById('tools').getElementsByClassName(`row${randomRow}`)
                row[column].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`

            }else{
        
                row = document.getElementById('techniques').getElementsByClassName(`row${randomRow}`)
                row[column].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`

            }
            
}

function sortIntoPhases(quadrantData){
    
    let randomRow = 0

    const sortIntoPhase = quadrantData.filter(tech => {
        if(tech.evaluationPhase === 'Adopt'){

            randomRow = Math.floor(Math.random() * 4) + 1

            mountPhasesToQuadGrid(tech, randomRow)

        } else if (tech.evaluationPhase === 'Trial'){
            
            randomRow = 4 + Math.floor(Math.random() * 4)
            
            mountPhasesToQuadGrid(tech, randomRow)

        } else if (tech.evaluationPhase === 'Assess'){
            randomRow = 8 + Math.floor(Math.random() * 4)

            mountPhasesToQuadGrid(tech, randomRow)

        } else if(tech.evaluationPhase === 'Hold'){
            randomRow = 12 + Math.floor(Math.random() * 4)

            mountPhasesToQuadGrid(tech, randomRow)
            
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

