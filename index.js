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

const phasesSVG =  `<svg width="516" height="34" aria-label="ring name labels for the radar blip graph" style="display: block;" opacity="1">
    <rect x="0" y="512" width="514" height="34" fill="white" opacity="1"></rect>
    <text class="left-quadrant" x="442" y="22" text-anchor="middle" fill="#221D1F" opacity="1">Adopt</text>
    <text class="left-quadrant" x="269" y="22" text-anchor="middle" fill="#221D1F" opacity="1">Trial</text>
    <text class="left-quadrant" x="133.5" y="22" text-anchor="middle" fill="#221D1F" opacity="1">Assess</text>
    <text class="left-quadrant" x="43" y="22" text-anchor="middle" fill="#221D1F" opacity="1">Hold</text>
    </svg>`
    
const phasesSVGInvert = `<svg width="512" height="34" aria-label="ring name labels for the radar blip graph" style="display: block;" opacity="1">
    <rect x="0" y="512" width="514" height="34" fill="white" opacity="1"></rect>
    <text class="right-quadrant" x="70" y="22" text-anchor="middle" fill="#221D1F" opacity="1">Adopt</text>
    <text class="right-quadrant" x="243" y="22" text-anchor="middle" fill="#221D1F" opacity="1">Trial</text>
    <text class="right-quadrant" x="378.5" y="22" text-anchor="middle" fill="#221D1F" opacity="1">Assess</text>
    <text class="right-quadrant" x="469" y="22" text-anchor="middle" fill="#221D1F" opacity="1">Hold</text>
    </svg>`

function containQuadrant(data, link, quadrantName, bgImage, color, startPos){
    
  const correctSvg = (quadName) => {
    if(quadName === "Languages and frameworks"){
        return phasesSVG
    }else if(quadName === "Platforms"){
        return phasesSVGInvert
    }else if(quadName === "Tools"){
        return `<div class="hidden order-svg">${phasesSVG}</div>`
    }else{  
    return `<div class="hidden order-svg">${phasesSVGInvert}</div>`
    }
}

    return  `
      <div class="${quadrantName}"> 
        <p class="label">
          <a href="${link}" id="${quadrantName}" class="link-to-quad font-regular">${quadrantName}</a>
          <span class="forward-arrow"></span>
        </p>
        <div class="quadrant-container">
          ${createQuadrant(data, bgImage, color,startPos, quadrantName)}
        </div>
        ${correctSvg(quadrantName)}
      </div>
    `

}


