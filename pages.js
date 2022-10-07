
const EMPTY = "EMPTY"

const ADOPT = "Adopt"
const TRIAL = "Trial"
const ASSESS = "Assess"
const HOLD = "Hold"


export function renderSection( color, data){
    //do some formatting

    return   renderQuadrant(
              color,
              data
            )
        

}

//TODO :change method to render grid
export function renderQuadrant( color, data) {
  let state = [];

  state = initializeNullValues(state);
  state = reservedSlots(state);
  state = plotPoints(state, data);

  const grid = state
    .map((item, i) => {
      return item
        .map((innerItem) => {
            switch (innerItem) {
                case null:
                  return setGridItemHtml(innerItem, null, i)
                case EMPTY:
                    return "<div class='grid-item reserved'></div>"
                default:
                    return setGridItemHtml(innerItem, !null, i)
            }
        })
        .join("");
    })
    .join("");


    //TODO : format h1
  const quadrantHtml = `
  <div class='grid'>
    <div class="tag adopt">adopt</div>
    <div class="tag trial">trial</div>
    <div class="tag assess">assess</div>
    <div class="tag hold">hold</div>
    
  
    ${grid}
  </div>`;

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

function plotPoints(state, quadrantData) {
  // console.log(quadrantData)
 
  for (let i = 0; i < quadrantData.length; i++) {
    const [row,col] = getOpenCell(state, quadrantData[i]);
    state[row][col] = quadrantData[i];
     
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

  return [randomRow, randomColumn];
}

function getOpenCell(state,  techPointData) {
  let [row, col] = generateCoOrdinate(techPointData.evaluationPhase);

  if (state[row][col] != null) {
    return getOpenCell(state, techPointData);x
  }else{
    return [row, col];
  }

}


function setGridItemHtml(innerItem, value, i){

  let insertTechId = ''
  let occupiedGridItem = ''
  let techName = ''

  if(innerItem != null){
    insertTechId = innerItem.id
    occupiedGridItem = 'occupied'
    techName = innerItem.technology
  }

  // <p><code>.tooltip</code> <a href="#" class="tooltip" data-tooltip="I’m the tooltip text.">Tooltip</a></p>

  if(i< 4){
    return `<div class='grid-item adopt ${occupiedGridItem}'>
              <span id='${insertTechId}' class="tooltip" data-tooltip="${techName}">${insertTechId}</span>
                
            </div>`
  }else if(i< 8){
    return `<div class='grid-item trial ${occupiedGridItem}'>
              <span id='${insertTechId}' class="tooltip" data-tooltip="${techName}">${insertTechId}</span>
                
            </div>`
  }else if(i< 12){
    return `<div class='grid-item assess ${occupiedGridItem}'>
              <span id='${insertTechId}' class="tooltip" data-tooltip="${techName}">${insertTechId}</span>
               
            </div>`
  }else{
    return `<div class='grid-item hold ${occupiedGridItem}'>
              <span id='${insertTechId}' class="tooltip" data-tooltip="${techName}">${insertTechId}</span>
               
            </div>`
  }


}

export function listenForClicks(){

  const techBlips = document.querySelectorAll(".occupied")

  techBlips.forEach((element) => {
  
    element.addEventListener('click', (e) => {
      // console.log(element)
      toggleDescription(e.target.id)

    })

  })

  const techNames = document.querySelectorAll(".data-point")

  techNames.forEach((element) => {
      element.addEventListener('click', (e) => {
      console.log(element)
      const arr = e.target.id.split('-')
      toggleDescription(arr[1])
    })
  })

}

function toggleDescription(id){
  
  const description = document.getElementById(`descr-${id}`)
  const techDataContainer = document.getElementById(`tech-${id}`)
  

  const upArrow = document.getElementById(`up-arrow-${id}`)
  const downArrow = document.getElementById(`down-arrow-${id}`)

  if(description.style.display === 'none'){
    console.log('yes')
    
    description.style.display = 'block'
    techDataContainer.style.backgroundColor = "#edf1f3"
    
    upArrow.classList.remove('hide')
    downArrow.classList.add('hide')
    

  }else{
    console.log('no')
    description.style.display = 'none'
    techDataContainer.style.backgroundColor = ""

    upArrow.classList.add('hide')
    downArrow.classList.remove('hide')
  }
}

