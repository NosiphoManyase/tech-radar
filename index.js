let languagesAndFrameworks = []
let platforms = []
let tools = []
let techniques = []
let counter = 0


fetch('https://tech-radar-api.herokuapp.com/tech-radar')
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sortData(data) 
        sortIntoPhases(languagesAndFrameworks)  
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



function randomColumn(){
    
    const randomColumn = Math.floor(Math.random() * 40)
    return randomColumn
}

function sortIntoPhases( quadrantData ){
    
    const gridItem = document.getElementsByClassName('grid-item')
    // const gridItem = getElementsByClassName('grid-item')
    let gridArray = createGrids()
    let randomRow = 0
    // console.log(quadrantData)

    const sortIntoPhase = quadrantData.filter(tech => {
        if(tech.evaluationPhase === 'Adopt'){

            randomRow = Math.floor(Math.random() * 10)
            //row might start at 0?-----
            // console.log(randomColumn, randomRow)
            const row = document.getElementsByClassName(`row${randomRow}`)
            // console.log(tech.techPlaceholderNum, randomRow)
            let column = randomColumn()
            row[column].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`
            // console.log(randomColumn, row)

        } else if (tech.evaluationPhase === 'Trial'){
            randomRow = 10 + Math.floor(Math.random() * 10)
            
            const row = document.getElementsByClassName(`row${randomRow}`)

            const column = randomColumn()
            row[column].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`

        } else if (tech.evaluationPhase === 'Assess'){
            randomRow = 20 + Math.floor(Math.random() * 10)

            const row = document.getElementsByClassName(`row${randomRow}`)

            const column = randomColumn()
            row[column].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`

        } else{
            randomRow = 30 + Math.floor(Math.random() * 10)

            const row = document.getElementsByClassName(`row${randomRow}`)

            const column = randomColumn()
            row[column].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`
        }
        
    })
    
}

function createGrids(){

    const column = 40
    const row = 40
    let count = 0
    
    let cellsArray = new Array(column)

    for(let i = 0; i<row; i++){
        cellsArray[i] = new Array(row)
        
        if(i<=10){
            cellsArray[i].fill(`<div class="grid-item row${count+=1} adopt"></div>`)
        }else if(i<=20){
            cellsArray[i].fill(`<div class="grid-item row${count+=1} trial"></div>`)
        }else if(i<=30){
            cellsArray[i].fill(`<div class="grid-item row${count+=1} assess"></div>`)
        }else{
            cellsArray[i].fill(`<div class="grid-item row${count+=1} hold"></div>`)
        }
    }

    let cells1dArray = []
    
    
    //convert nested arrays then array to string
    cellsArray.forEach(innerArray => cells1dArray.push(`${innerArray.join('\n')}`))
    let cellsArrayHtml = cells1dArray.join('\n')
    

    const grid = document.getElementById('grid')
    grid.innerHTML = cellsArrayHtml
    

    grid.style.gridTemplateRows =  `repeat(${row}, 1fr)`
    grid.style.gridTemplateColumns =  `repeat(${column},1fr)`


    return cellsArray
}

createGrids()