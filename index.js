import {setMainPageHtml, createQuadrant} from './linkedPages.js'
import { useExcelFetcher } from "./useExcelFetcher.js"

getData()

async function getData(){
  let data = []

  try {
    data = await useExcelFetcher()
    
  } catch (err) {
    console.error('Could not parse json', err)
  }
  
  assembly(data)
  
  
}

function assembly(data) {

    const languages = data.filter((data) => data.quadrant === "languages and frameworks")   
    const platforms = data.filter((data) => data.quadrant === "platforms")
    const tools = data.filter((data) => data.quadrant === "tools")
    const techniques = data.filter((data) => data.quadrant === "techniques")

    const languagesQuad = containQuadrant(languages, "lang-and-F.html", "Languages and frameworks", "./imgs/top-left.svg", "#00baeb", ["bottom","right" ])
    const platformsQuad = containQuadrant(platforms, "platforms.html","Platforms", "./imgs/top-right.svg", "#ffbe28", ["bottom","left" ])
    const toolsQuad = containQuadrant(tools,"tools.html","Tools", "./imgs/bottom-left.svg", "#7472f5", ["top","right"] )
    const techniquesQuad = containQuadrant(techniques,"techniques.html","Techniques", "./imgs/bottom-right.svg","#35c8c1",["top","left"] )                
    
    setMainPageHtml(languagesQuad, platformsQuad, toolsQuad, techniquesQuad)

}

function containQuadrant(data, link, quadrantName, bgImage, color, startPos){
    
    return  `
    <div class="semi-circle-container" > 
        <p class="label ${quadrantName}">
          <a href="${link}" id="${quadrantName}" class="link-to-quad">${quadrantName}</a>
          <span class="forward-arrow"></span>
        </p>
        ${createQuadrant(data, bgImage, color,startPos)}
    </div>`

}


