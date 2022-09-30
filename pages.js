
const EMPTY = "EMPTY"

const ADOPT = "Adopt"
const TRIAL = "Trial"
const ASSESS = "Assess"
const HOLD = "Hold"


export function renderSection(color, data){
    //do some formatting

    return `
    <div class="quadrant-container ${className}" >
        
            ${renderQuadrant(
              color,
              data
            )}
        </div>
    `

}

//TODO :change method to render grid
export function renderQuadrant( color, data) {
  let state = [];

  state = initializeNullValues(state);
  state = reservedSlots(state);
  state = plotPoints(state, data);

  const grid = state
    .map((item) => {
      return item
        .map((innerItem) => {
            switch (innerItem) {
                case null:
                    return "<div class='grid-item'></div>"
                case EMPTY:
                    return "<div class='grid-item reserved'></div>"
                default:
                    return `<div class='grid-item'>${innerItem.id}</div>`
            }
        })
        .join("");
    })
    .join("");

    //TODO : format h1
  const quadrantHtml = `<div class='grid'>${grid}</div>`;

  return quadrantHtml;
}

//TODO : each method needs a docstring

export function initializeNullValues(state) {
  for (let i = 0; i < 16; i++) {
    state[i] = new Array(16).fill(null);
  }

  return state;
}

export function reservedSlots(state) {

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

export function plotPoints(state, quadrantData) {
  // console.log(quadrantData)
 
  for (let i = 0; i < quadrantData.length; i++) {
    const [row,col] = getOpenCell(state, quadrantData[i]);
    state[row][col] = quadrantData[i];
     
  }

  return state;
}

export function generateCoOrdinate(evalPhase) {
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

  return [randomRow, randomColumn];
}

export function getOpenCell(state,  techPointData) {
  let [row, col] = generateCoOrdinate(techPointData.evaluationPhase);

  if (state[row][col] != null) {
    return getOpenCell(state, techPointData);x
  }else{
    return [row, col];
  }

}

// export {renderSection, 
//         renderQuadrant, 
//         initializeNullValues, 
//         reservedSlots, 
//         plotPoints, 
//         generateCoOrdinate,
//         getOpenCell
//       }