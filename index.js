// import * as d3 from 'https://unpkg.com/d3?module'


const quadrantOne = document.getElementById("quadrant-one")
const quadrantTwo = document.getElementById("quadrant-two")
const quadrantThree = document.getElementById("quadrant-three")
const quadrantFour = document.getElementById("quadrant-four")

//counter = placeholder for tech blips on the dom
let counter = 0

let languagesAndFrameworks = []
let platforms = []
let tools = []
let techniques = []



fetch('https://tech-radar-api.herokuapp.com/tech-radar')
    .then(response => response.json())
    .then(data => {
        sortData(data)
        // createTechBlips()
            // renderTechBlips()
            // generateCircles()
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

function createGrids(){

    const column = 100
    const row = 100

    let cellsArray = new Array(column)

    for(let i = 0; i<row; i++){
        cellsArray[i] = new Array(row).fill(`<div class="grid-item">1</div>`)
    }

    let cells1dArray = []

    //convert nested arrays then array to string
    cellsArray.forEach(innerArray => cells1dArray.push(`<div class="column">\n${innerArray.join('\n')}\n</div>`))
    let cellsArrayHtml = cells1dArray.join('\n')

    const grid = document.getElementById('grid')
    grid.innerHTML = cellsArrayHtml

    grid.style.gridTemplateRows =  `repeat(${row}, 1fr)`
    grid.style.gridTemplateColumns =  `repeat(${column}, 1fr)`

    const columnHtml = document.getElementsByClassName('column')


    //target specific grids
    const cell = columnHtml[10].getElementsByClassName('grid-item')
    cell[5].style.backgroundColor = "pink"

}

createGrids()

// function renderTechBlips(){
//     const allHtml = createTechBlips()

//     quadrantOne.innerHTML += allHtml[0]
//     quadrantTwo.innerHTML += allHtml[1]
//     quadrantThree.innerHTML += allHtml[2]
//     quadrantFour.innerHTML += allHtml[3]
    
// }
