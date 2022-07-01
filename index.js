import {technologies} from './data.js'

const quadrantOne = document.getElementById("quadrant-one")
const quadrantTwo = document.getElementById("quadrant-two")
const quadrantThree = document.getElementById("quadrant-three")
const quadrantFour = document.getElementById("quadrant-four")


// Tech lists for quadrants
// filter and map in chronological order for consistency in techNumber placeholder
let techNum = 0

const languagesAndFrameworks = technologies.filter(technology => {
   return technology.quadrant === "languages and frameworks" 
}).map(obj=> ({ ...obj,     techNumber : techNum += 1  }))

const platforms = technologies.filter(technology =>{
    return technology.quadrant === "platforms"
}).map(obj=> ({ ...obj,     techNumber : techNum += 1  }))

const tools = technologies.filter(technology => {
    return technology.quadrant === "tools"
}).map(obj=> ({ ...obj,     techNumber : techNum += 1  }))

const techniques = technologies.filter(technology =>{
    return technology.quadrant === "techniques"
}).map(obj=> ({ ...obj,     techNumber : techNum += 1  }))




function createTechBlips(){
    const quadrantOneHtml = languagesAndFrameworks.map(q1Blip =>
        `<div class="tech-blip">
    <div class="tech-circle ${q1Blip.statusOfTechnology}">
        <span class="tech-placeholder ${q1Blip.evaluationPhase}">${q1Blip.techNumber}</span>
    </div>
    <span class="tech-name">${q1Blip.technology}</span>
</div>`
    ).join('\n')

    const quadrantTwoHtml = platforms.map(q2Blip =>
        `<div class="tech-blip">
    <div class="tech-circle ${q2Blip.statusOfTechnology}">
        <span class="tech-placeholder ${q2Blip.evaluationPhase}">${q2Blip.techNumber}</span>
    </div>
    <span class="tech-name">${q2Blip.technology}</span>
</div>`
    ).join('\n')

    const quadrantThreeHtml = tools.map(q3Blip =>
        `<div class="tech-blip">
    <div class="tech-circle ${q3Blip.statusOfTechnology}">
        <span class="tech-placeholder ${q3Blip.evaluationPhase}">${q3Blip.techNumber}</span>
    </div>
    <span class="tech-name">${q3Blip.technology}</span>
</div>`
    ).join('\n')

    const quadrantFourHtml = techniques.map(q4Blip =>
        `<div class="tech-blip">
    <div class="tech-circle ${q4Blip.statusOfTechnology}">
        <span class="tech-placeholder ${q4Blip.evaluationPhase}">${q4Blip.techNumber}
        <span class="tech-name">${q4Blip.technology}</span></span>
    </div>
    
</div>`
    ).join('\n')

    return [quadrantOneHtml, quadrantTwoHtml, quadrantThreeHtml, quadrantFourHtml]

    // console.log(quadrantOneHtml)
    // console.log(quadrantTwoHtml)
    // console.log(quadrantThreeHtml)
    // console.log(quadrantFourHtml)

}

function renderTechBlips(){
    const allHtml = createTechBlips()

    quadrantOne.innerHTML += allHtml[0]
    quadrantTwo.innerHTML += allHtml[1]
    quadrantThree.innerHTML += allHtml[2]
    quadrantFour.innerHTML += allHtml[3]
    
    // console.log(allHtml[0])
    // console.log(allHtml[1])
    // console.log(allHtml[2])
    // console.log(allHtml[3])
}

renderTechBlips()


function setPosition(){
    
}