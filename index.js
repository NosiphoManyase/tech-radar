import {createQuadrant, legend} from './linkedPages.js'


fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    assembly(data);
    
  });

 
const phasesSVG =  `<svg class="phases" width="516" height="34" aria-label="ring name labels for the radar blip graph" style="display: block;" opacity="1">
<rect x="0" y="512" width="514" height="34" fill="white" opacity="1"></rect>
<text class="left-quadrant" x="442" y="18" text-anchor="middle" fill="#221D1F" opacity="1">Adopt</text>
<text class="left-quadrant" x="269" y="18" text-anchor="middle" fill="#221D1F" opacity="1">Trial</text>
<text class="left-quadrant" x="133.5" y="18" text-anchor="middle" fill="#221D1F" opacity="1">Assess</text>
<text class="left-quadrant" x="43" y="18" text-anchor="middle" fill="#221D1F" opacity="1">Hold</text>
</svg>`

const phasesSVGInvert = `<svg class="phases" width="512" height="34" aria-label="ring name labels for the radar blip graph" style="display: block;" opacity="1">
<rect x="0" y="512" width="514" height="34" fill="white" opacity="1"></rect>
<text class="right-quadrant" x="70" y="18" text-anchor="middle" fill="#221D1F" opacity="1">Adopt</text>
<text class="right-quadrant" x="243" y="18" text-anchor="middle" fill="#221D1F" opacity="1">Trial</text>
<text class="right-quadrant" x="378.5" y="18" text-anchor="middle" fill="#221D1F" opacity="1">Assess</text>
<text class="right-quadrant" x="469" y="18" text-anchor="middle" fill="#221D1F" opacity="1">Hold</text>
</svg>`

function assembly(data) {

    const languages = data.filter(
        (data) => data.quadrant === "languages and frameworks"
      ) 
      
    const platforms = data.filter((data) => data.quadrant === "platforms")

    const tools = data.filter((data) => data.quadrant === "tools")

    const techniques = data.filter((data) => data.quadrant === "techniques")

  const main = `
    <div class="body-container">
        <main>
            <header class="main-header"> 
              <h1>Bash Tech-Radar</h1>
            </header>
            <div class="quadrants-container">

                    ${containQuadrant(languages, "lang-and-F.html", "Languages And Frameworks", "./imgs/top-left.svg", "#00baeb" )}
                    ${containQuadrant(platforms, "platforms.html","Platforms", "./imgs/top-right.svg", "#ffbe28" )}
                    ${phasesSVG}
                    ${phasesSVGInvert}
                    ${containQuadrant(tools,"tools.html","Tools", "./imgs/bottom-left.svg", "#7472f5" )}
                    ${containQuadrant(techniques,"techniques.html","Techniques", "./imgs/bottom-right.svg","#35c8c1" )}
                    
            </div>
        </main>
        ${legend}
    </div>`;

  document.body.innerHTML += main;

}

function containQuadrant(data, link, quadrantName, bgImage, color){
    
    return  `
    <div class="semi-circle-container" > 
        <p class="label ${quadrantName}"><a href="${link}" id="${quadrantName}">${quadrantName}</a></p>
        ${createQuadrant(data, bgImage, color)}
    </div>`

}


