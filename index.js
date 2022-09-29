let randomColumn = 0;
let randomRow = 0;

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    assembly(data);
    toggleSinglePage(data);
  });

function assembly(data) {
  const main = `
    <div class="body-container">
    <main>
        
        <h1>Bash Tech-Radar</h1>
        <div class="quadrants-container">
        <div class="quadrant-container languages" >
            ${renderQuadrant(
              "Languages And Frameworks",
              "#93C572",
              data.filter(
                (data) => data.quadrant === "languages and frameworks"
              )
            )}
        </div>
        <div class="quadrant-container platforms">
            ${renderQuadrant(
              "Platforms",
              "#FF5733",
              data.filter((data) => data.quadrant === "platforms")
            )}
        </div>
        <div class="quadrant-container tools">
            ${renderQuadrant(
              "Tools",
              "#FFC300",
              data.filter((data) => data.quadrant === "tools")
            )}
        </div>
        <div class="quadrant-container techniques">
            ${renderQuadrant(
              "Techniques",
              "#008080",
              data.filter((data) => data.quadrant === "techniques")
            )}
        </div>
        </div>
        
    </main>
    </div>`;

  document.body.innerHTML = main;

  
}

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
            : innerItem === "EMPTY"
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

function initializeNullValues(state) {
  for (let i = 0; i < 16; i++) {
    state[i] = new Array(16).fill(null);
  }

  return state;
}

function reservedSlots(state) {
  let slots = state.map((row, index) => {
    if (index === 0) {
      return row.map((column, i) => {
        return i <= 3 ? "EMPTY" : column;
      });
    } else if (index === 4) {
      return row.map((column, i) => {
        return i <= 3 ? "EMPTY" : column;
      });
    } else if (index === 8) {
      return row.map((column, i) => {
        return i <= 3 ? "EMPTY" : column;
      });
    } else if (index === 12) {
      return row.map((column, i) => {
        return i <= 3 ? "EMPTY" : column;
      });
    } else {
      return row;
    }
  });
  //   console.log('reserved state')
  //   console.log(slots)
  return slots;
}

function sortIntoPhases(state, quadrantData) {
  // console.log(quadrantData)
  let count = 0;
  for (let i = 0; i < quadrantData.length; i++) {
    if (quadrantData[i].evaluationPhase === "Adopt") {
      getOpenCell(state, quadrantData[i].evaluationPhase, quadrantData[i]);
    } else if (quadrantData[i].evaluationPhase === "Trial") {
      getOpenCell(state, quadrantData[i].evaluationPhase, quadrantData[i]);
    } else if (quadrantData[i].evaluationPhase === "Assess") {
      getOpenCell(state, quadrantData[i].evaluationPhase, quadrantData[i]);
    } else if (quadrantData[i].evaluationPhase === "Hold") {
      getOpenCell(state, quadrantData[i].evaluationPhase, quadrantData[i]);
    }
  }

  return state;
}

function randomRowAndColumn(evalPhase) {
  let range = 0;

  if (evalPhase === "Adopt") {
    range = 0;
  } else if (evalPhase === "Trial") {
    range = 4;
  } else if (evalPhase === "Assess") {
    range = 8;
  } else if (evalPhase === "Hold") {
    range = 12;
  }

  randomRow = range + Math.floor(Math.random() * 4);

  randomColumn = Math.floor(Math.random() * 16);
  // console.log(techName, '[', randomRow, ',' , randomColumn,']')

  return [randomRow, randomColumn];
}

function getOpenCell(state, evaluationPhase, techPointData) {
  let occupyCell = randomRowAndColumn(evaluationPhase, techPointData);

  if (state[occupyCell[0]][occupyCell[1]] != null) {
    getOpenCell(state, evaluationPhase, techPointData);
  } else {
    state[occupyCell[0]][occupyCell[1]] = techPointData;
  }

  return state;
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
