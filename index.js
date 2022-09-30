import {renderSection  } from './pages.js'


fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    //before assemby, transform data before you send to assembly
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
    <div class="body-container">
        <main>
            <h1>Bash Tech-Radar</h1>
            <div class="quadrants-container">

                    ${containQuadrant("#93C572", languages, "lang-and-F.html", "Languages And Frameworks")}
                    ${containQuadrant( "#FF5733", platforms, "platforms.html", "Platforms" )}
                    ${containQuadrant( "#FFC300", tools, "tools.html", "Tools" )}
                    ${containQuadrant("#008080", techniques, "techniques.html", "Techniques" )}
    
            </div>
        </main>
    </div>`;

  document.body.innerHTML = main;

  
}

function containQuadrant(color, data, link, quadrantName){
    
    return  `
    <div class="quadrant-container  " > 
        <h1 class="label"><a href="${link}" id="${quadrantName}">${quadrantName}</a></h1>
        ${renderSection( color, data)}
    </div>`

}


