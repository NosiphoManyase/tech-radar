let languagesAndFrameworks = []
let platforms = []
let tools = []
let techniques = []
let counter = 0


fetch('https://tech-radar-api.herokuapp.com/tech-radar')
    .then(response => response.json())
    .then(data => {
        console.log(data)
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



function randomRow(){
    
    const randomRow = Math.floor(Math.random() * 100)
    return randomRow
}

function sortIntoPhases( quadrantData ){
    
    

    const column = document.getElementsByClassName('column')
    // const gridItem = getElementsByClassName('grid-item')
    let gridArray = createGrids()
    let randomColumn = 0
    console.log(quadrantData)

    const sortIntoPhase = quadrantData.filter(tech => {
        if(tech.evaluationPhase === 'Adopt'){

            randomColumn = Math.floor(Math.random() * 25)
            adoption = column[randomColumn]
            const row = randomRow()
            adoption.getElementsByClassName('grid-item')[row].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`
            // console.log(randomColumn, row)

        } else if (tech.evaluationPhase === 'Trial'){
            randomColumn = 25 + Math.floor(Math.random() * 25)
            trial = column[randomColumn]
            const row = randomRow()
            trial.getElementsByClassName('grid-item')[row].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`
                console.log(randomColumn, row)

        } else if (tech.evaluationPhase === 'Assess'){
            randomColumn = 50 + Math.floor(Math.random() * 25)
            assess = column[randomColumn]
            const row = randomRow()
            assess.getElementsByClassName('grid-item')[row].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`
                console.log(randomColumn, row)

        } else{
            randomColumn = 75 + Math.floor(Math.random() * 25)
            hold = column[randomColumn]
            const row = randomRow()
            hold.getElementsByClassName('grid-item')[row].innerHTML += 
                `<span class='data-point'>${tech.techPlaceholderNum}</span`
                console.log(randomColumn, row)
        }
        
    })
    
    // console.log(randomAdoptColumn, randomTrialColumn, randomAssessColumn, randomHoldColumn, randomRow)


}

function createGrids(){

    const column = 100
    const row = 100
    // let count = 0
    let cellsArray = new Array(column)

    for(let i = 0; i<row; i++){
        cellsArray[i] = new Array(row)
        .fill(`<div class="grid-item"></div>`)
    }

    let cells1dArray = []
    // console.log(cellsArray)
    
    //convert nested arrays then array to string
    cellsArray.forEach(innerArray => cells1dArray.push(`<div class='column'>${innerArray.join('\n')}</div>`))
    let cellsArrayHtml = cells1dArray.join('\n')
    

    const grid = document.getElementById('grid')
    grid.innerHTML = cellsArrayHtml
    

    grid.style.gridTemplateRows =  `repeat(${row}, 1fr)`
    grid.style.gridTemplateColumns =  `repeat(${column},1fr)`


    let gridItem = document.getElementsByClassName('grid-item')
    const columnHtml = document.getElementsByClassName('column')
    
    //target specific grids

    const cellOne = gridItem[10]
    cellOne.style.backgroundColor = "orange"
    
    let columnBg = columnHtml
    // cellTwo = cellTwo.getElementsByClassName('grid-item')[5]
    for(let i=0; i<100 ; i++){
        if(i<25){
            columnBg[i].style.backgroundColor = "rgba(255, 0, 0, 0.3)"
        }
        else if(i<50){
            columnBg[i].style.backgroundColor = "rgba(0, 255, 0, 0.3)"
        }
        else if(i<75){
            columnBg[i].style.backgroundColor = "rgba(0, 0, 255, 0.3)"
        }
        else{
            columnBg[i].style.backgroundColor = "rgb(255, 165, 0, 0.3)"
        }
        
    }
    

    const cellThree = gridItem[404]
    cellThree.style.backgroundColor = "pink"
    // cellThree.style.gridColumn = 4
    // cellThree.style.gridRow = 65

    const cellFour = gridItem[2000]
    cellFour.style.backgroundColor = "brown"
    // columnHtml.style.border = '1px solid green'

    return cellsArray
}

createGrids()