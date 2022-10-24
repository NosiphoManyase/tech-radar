import {createQuadrant, legend, header, footer, phasesSVG, phasesSVGInvert} from './linkedPages.js'


fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    assembly(data);
    
  });


function assembly(data) {

    const languages = data.filter(
        (data) => data.quadrant === "languages and frameworks"
      ) 
      
    const platforms = data.filter((data) => data.quadrant === "platforms")

    const tools = data.filter((data) => data.quadrant === "tools")

    const techniques = data.filter((data) => data.quadrant === "techniques")

  const main = `
      ${header}
      <div class="body-container">
          <main class="landing-page">
            <div class="quadrants-container">

                    ${containQuadrant(languages, "lang-and-F.html", "Languages and frameworks", "./imgs/top-left.svg", "#00baeb", ["bottom","right" ])}
                    ${containQuadrant(platforms, "platforms.html","Platforms", "./imgs/top-right.svg", "#ffbe28", ["bottom","left" ])}
                    ${phasesSVG}
                    ${phasesSVGInvert}
                    ${containQuadrant(tools,"tools.html","Tools", "./imgs/bottom-left.svg", "#7472f5", ["top","right"] )}
                    ${containQuadrant(techniques,"techniques.html","Techniques", "./imgs/bottom-right.svg","#35c8c1",["top","left"] )}
                    
            </div>
          </main>
          ${legend()}
          ${footer}
      </div>`;

  document.body.innerHTML = main;

}

function containQuadrant(data, link, quadrantName, bgImage, color, startPos){
    
    return  `
    <div class="semi-circle-container" > 
        <p class="label ${quadrantName}">
          <a href="${link}" id="${quadrantName}" class="link-to-quad">${quadrantName}</a>
          <span class="forward-arrow"></span>
        </p>
        ${createQuadrant(data, bgImage, color, startPos)}
    </div>`

}


