
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
