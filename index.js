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
        createTechBlips()
        renderTechBlips()
            
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
        cellsArray[i] = new Array(row)
        // .fill(`<div class="grid-item"></div>`)
    }

    let cells1dArray = []

    //convert nested arrays then array to string
    cellsArray.forEach(innerArray => cells1dArray.push(`<div class="grid-item"></div>`))
    let cellsArrayHtml = cells1dArray.join('\n')

    const grid = document.getElementById('grid')
    grid.innerHTML = cellsArrayHtml

    grid.style.gridTemplateRows =  `repeat(${row}, 1fr)`
    grid.style.gridTemplateColumns =  `repeat(${column}, 1fr)`


    const columnHtml = document.getElementsByClassName('grid-item')
    
 
    //target specific grids
    const cellOne = columnHtml[10]
    cellOne.style.backgroundColor = "orange"
    cellOne.style.gridColumn = 58
    cellOne.style.gridRow = 54

    const cellTwo = columnHtml[11]
    cellTwo.style.backgroundColor = "purple"
    cellTwo.style.gridColumn = 72
    cellTwo.style.gridRow = 18

    const cellThree = columnHtml[15]
    cellThree.style.backgroundColor = "brown"
    cellThree.style.gridColumn = 4
    cellThree.style.gridRow = 65
}

createGrids()

function createTechBlips(){
    const quadrantOneHtml = languagesAndFrameworks.map(q1Blip =>
        `<div class="tech-blip">
    <div class="tech-circle ${q1Blip.statusOfTechnology}">
        <span class="tech-placeholder ${q1Blip.evaluationPhase}">${q1Blip.techPlaceholderNum}</span>
    </div>
    <span class="tech-name">${q1Blip.technology}</span>
</div>`
    ).join('\n')

    const quadrantTwoHtml = platforms.map(q2Blip =>
        `<div class="tech-blip">
    <div class="tech-circle ${q2Blip.statusOfTechnology}">
        <span class="tech-placeholder ${q2Blip.evaluationPhase}">${q2Blip.techPlaceholderNum}</span>
    </div>
    <span class="tech-name">${q2Blip.technology}</span>
</div>`
    ).join('\n')

    const quadrantThreeHtml = tools.map(q3Blip =>
        `<div class="tech-blip">
    <div class="tech-circle ${q3Blip.statusOfTechnology}">
        <span class="tech-placeholder ${q3Blip.evaluationPhase}">${q3Blip.techPlaceholderNum}</span>
    </div>
    <span class="tech-name">${q3Blip.technology}</span>
</div>`
    ).join('\n')

    const quadrantFourHtml = techniques.map(q4Blip =>
        `<div class="tech-blip">
    <div class="tech-circle ${q4Blip.statusOfTechnology}">
        <span class="tech-placeholder ${q4Blip.evaluationPhase}">${q4Blip.techPlaceholderNum}
        <span class="tech-name">${q4Blip.technology}</span></span>
    </div>
    
</div>`
    ).join('\n')
    
    return [quadrantOneHtml, quadrantTwoHtml, quadrantThreeHtml, quadrantFourHtml]

}

function renderTechBlips(){
    const allHtml = createTechBlips()

    quadrantOne.innerHTML += allHtml[0]
    quadrantTwo.innerHTML += allHtml[1]
    quadrantThree.innerHTML += allHtml[2]
    quadrantFour.innerHTML += allHtml[3]
    
}
