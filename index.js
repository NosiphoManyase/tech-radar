import * as d3 from 'https://unpkg.com/d3?module'


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
        renderTechBlips()
        generateCircles()
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


function rAndTheta(radius){
    // console.log(Math.sqrt(Math.random()))
    const r = radius  * Math.sqrt(Math.random())
    const theta = Math.random() * 2 * Math.PI
    return [r, theta]
}

    // r = R * sqrt(random())
    // theta = random() * 2 * PI
        
    // x = 0 + r * cos(     theta)
    // y = 0    + r * sin(theta)

function posXandY(center, radius){
    const r = rAndTheta(radius)[0] 
    const theta = rAndTheta(radius)[1]

    const x = center + r * Math.cos(theta)
    const y = center + r * Math.sin(theta)


    return [x,y]
    
}


function generateCircles(){
    
    const gTag = d3.select('#adopt')
        .attr('width', '250')
        .attr('height', '250')
        .append('g')
        // .style('position', 'absolute')

    const circle = gTag
        .append('circle')
        .attr('cx', 125)
        .attr('cy', 125)
        .attr("r", 120)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("fill", "transparent")

    // save pos. x and y to array

    let xAndYarray = []
    for(let i = 0; i<languagesAndFrameworks.length; i++){
        let xAndY = posXandY(125,120)
        xAndYarray.push(xAndY)
    }
    console.log(xAndYarray)
    let countX = -1
    let countY = -1

    const techBlip = gTag
        .selectAll('text')
        .data(languagesAndFrameworks)
        .enter().append('text')
        .attr('x', () =>{
            countX += 1
            return  xAndYarray[countX][0]
        } )
        .attr('y', () =>{
            countY += 1
            return xAndYarray[countY][1]
        })
        .html((technology)=> technology.techPlaceholderNum)
        

    const circleTwo = d3.select('#trial')
    .attr('width', '400')
    .attr('height', '400')
    .append('g')
    .append('circle')
    .attr('cx', "200")
    .attr('cy', "200")
    .attr("r", 180)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "transparent")
        

    const circleThree = d3.select('#assess')
    .attr('width', '600')
    .attr('height', '600')
    .append('g')
    .append('circle')
    .attr('cx', "300")
    .attr('cy', "300")
    .attr("r", 250)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "transparent")

    const circleFour = d3.select('#hold')
    .attr('width', '637')
    .attr('height', '637')
    .append('g')
    .append('circle')
    .attr('cx', "318.5")
    .attr('cy', "318.5")
    .attr("r", 315)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "transparent")


}




function renderTechBlips(){
    // const allHtml = createTechBlips()

    // quadrantOne.innerHTML += allHtml[0]
    // quadrantTwo.innerHTML += allHtml[1]
    // quadrantThree.innerHTML += allHtml[2]
    // quadrantFour.innerHTML += allHtml[3]
    
}
