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
    console.log(link)
    return  `
    <div class="quadrant-container  " > 
        <h1 class="label"><a href="${link}" id="${quadrantName}">${quadrantName}</a></h1>
        ${renderSection( color, data)}
    </div>`

}


// function toggleSinglePage(data) {
//   renderSinglePage(
//     "LanguagesAndFrameworks",
//     "#93C572",
//     data.filter((data) => data.quadrant === "languages and frameworks")
//   );
//   renderSinglePage(
//     "Platforms",
//     "#FF5733",
//     data.filter((data) => data.quadrant === "platforms")
//   );
//   renderSinglePage(
//     "Tools",
//     "#FFC300",
//     data.filter((data) => data.quadrant === "tools")
//   );
//   renderSinglePage(
//     "Techniques",
//     "#008080",
//     data.filter((data) => data.quadrant === "techniques")
//   );
// }

// function renderSinglePage(quadrantName, color, data) {
//     // console.log(quadrantName)
//   const clickedQuadrant = document.getElementById(quadrantName);

//   clickedQuadrant.addEventListener("click", () => {
    
//     const quadrantHtml = `<main>
//             ${renderQuadrant(quadrantName, color, data)}
//         </main>`;
    
//     const singlePage = document.getElementById(getCurrentQuadrant(quadrantName))
    
//     singlePage.innerHTML += quadrantHtml
//   });
// }

// function getCurrentQuadrant(quadrantName){
//     if(quadrantName === "LanguagesAndFrameworks"){
//         return "langAndFrameworksQuad"
//     }else if(quadrantName === "Platforms"){
//         return "platformsQuad"
//     }else if(quadrantName === "Tools"){
//         return "toolsQuad"
//     }else{
//         return "techniquesQuad"
//     }
// }
