
const EMPTY = "EMPTY"
const ADOPT = "Adopt"
const TRIAL = "Trial"
const ASSESS = "Assess"
const HOLD = "Hold"

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    //before assemby, transform data before you send to assembly
    assembly(data);
    toggleSinglePage(data);
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
                ${renderSection("Languages And Frameworks", "#93C572", languages, "languages" )}
                ${renderSection('Platforms', "#FF5733", platforms , "platforms")}
                ${renderSection("Tools", "#FFC300", tools, "tools" )}
                ${renderSection("Techniques", "#008080", techniques, "techniques" )}
            </div>
        </main>
    </div>`;

  document.body.innerHTML = main;

  
}

function renderSection(title, color, data, className ){
    //do some formatting

    return `
    <div class="quadrant-container ${className}" >
        
            ${renderQuadrant(
              title,
              color,
              data
            )}
        </div>
    `

}

//TODO :change method to render grid
function renderQuadrant(quadrantName, color, data) {
  let state = [];

  state = initializeNullValues(state);
  state = reservedSlots(state);
  state = sortIntoPhases(state, data);

  const grid = state
    .map((item) => {
      return item
        .map((innerItem, i) => {
          return innerItem === null
            ? "<div class='grid-item'></div>"
            : innerItem === EMPTY
            ? "<div class='grid-item reserved'></div>"
            : `<div class='grid-item'>${innerItem.id}</div>`;
        })
        .join("\n");
    })
    .join("\n");

  // console.log(quadrantName)
  const quadrantHtml = `<h1 class="label"><a href="${pageLink(
    quadrantName.replace(/\s/g, "")
  )}" id="${quadrantName.replace(/\s/g, "")}">${quadrantName}</a></h1>
    <div class='grid'>${grid}</div>`;

  return quadrantHtml;
}

//TODO : each method needs a docstring

function initializeNullValues(state) {
  for (let i = 0; i < 16; i++) {
    state[i] = new Array(16).fill(null);
  }

  return state;
}

function reservedSlots(state) {

    state[0][0] = EMPTY
    state[0][1] = EMPTY
    state[0][2] = EMPTY
    state[0][3] = EMPTY

    state[4][0] = EMPTY
    state[4][1] = EMPTY
    state[4][2] = EMPTY
    state[4][3] = EMPTY

    state[8][0] = EMPTY
    state[8][1] = EMPTY
    state[8][2] = EMPTY
    state[8][3] = EMPTY

    state[12][0] = EMPTY
    state[12][1] = EMPTY
    state[12][2] = EMPTY
    state[12][3] = EMPTY

    return state
}

function sortIntoPhases(state, quadrantData) {
  // console.log(quadrantData)
 
  for (let i = 0; i < quadrantData.length; i++) {
    const [row, col] = getOpenCell(state, quadrantData[i]);
    if (state[row][col] != null) {
        getOpenCell(state, quadrantData[i]);
      } else {
        state[row][col] = quadrantData[i];
      }
  }

  return state;
}

function generateCoOrdinate(evalPhase) {
let randomColumn = 0;
let randomRow = 0;
  let offset = 0;

  if (evalPhase === ADOPT) {
    offset = 0;
  } else if (evalPhase === TRIAL) {
    offset = 4;
  } else if (evalPhase === ASSESS ) {
    offset = 8;
  } else if (evalPhase === HOLD ) {
    offset = 12;
  }

  randomRow = offset + Math.floor(Math.random() * 4);

  randomColumn = Math.floor(Math.random() * 16);
  // console.log(techName, '[', randomRow, ',' , randomColumn,']')

  return [randomRow, randomColumn];
}

function getOpenCell(state,  techPointData) {
    // console.log(techPointData)
  let [row, col] = generateCoOrdinate(techPointData.evaluationPhase);

  return [row, col];
}

function pageLink(quadrantName) {
  if (quadrantName === "LanguagesAndFrameworks") {
    return "lang-and-F.html";
  } else if (quadrantName === "Platforms") {
    return "platforms.html";
  } else if (quadrantName === "Tools") {
    return "tools.html";
  } else {
    return "techniques.html";
  }
}

function toggleSinglePage(data) {
  const languagesListener = renderSinglePage(
    "LanguagesAndFrameworks",
    "#93C572",
    data.filter((data) => data.quadrant === "languages and frameworks")
  );
  const platformsListener = renderSinglePage(
    "Platforms",
    "#FF5733",
    data.filter((data) => data.quadrant === "platforms")
  );
  const toolsListener = renderSinglePage(
    "Tools",
    "#FFC300",
    data.filter((data) => data.quadrant === "tools")
  );
  const techniquesListener = renderSinglePage(
    "Techniques",
    "#008080",
    data.filter((data) => data.quadrant === "techniques")
  );
}

function renderSinglePage(quadrantName, color, data) {
    // console.log(quadrantName)
  const clickedQuadrant = document.getElementById(quadrantName);

  clickedQuadrant.addEventListener("click", () => {
    
    const quadrantHtml = `<main>
            ${renderQuadrant(quadrantName, color, data)}
        </main>`;
    
    const singlePage = document.getElementById(getCurrentQuadrant(quadrantName))
    
    singlePage.innerHTML += quadrantHtml
  });
}

function getCurrentQuadrant(quadrantName){
    if(quadrantName === "LanguagesAndFrameworks"){
        return "langAndFrameworksQuad"
    }else if(quadrantName === "Platforms"){
        return "platformsQuad"
    }else if(quadrantName === "Tools"){
        return "toolsQuad"
    }else{
        return "techniquesQuad"
    }
}
