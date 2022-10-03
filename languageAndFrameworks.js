import {renderSection, toggleDescription } from './pages.js'

let languagesData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    languagesData = data.filter( dataPoint => dataPoint.quadrant === "languages and frameworks")
    assemble(languagesData, "Languages And Frameworks")
    
});

function assemble(data, quadrantName){
    const main = `
    <main class="wrap-quadrant">
        <header><h1>${quadrantName}</h1></header> 
        <aside>${displayData(data)}</aside>
        <div class="link-pages-container">${renderSection( "#93C572", data )} </div>
    </main>`

    const renderpage = document.getElementById("langAndFrameworksQuad")
    renderpage.innerHTML = main

    toggleDescription()
}

function displayData(data){

    const dataInfoList = data.map( dataEl => {
        return `
        <div class="data-point"> 
            <p>${dataEl.technology}</p>
            <p id='descr-${dataEl.id}' style='display:none'>${dataEl.description}</p>
        </div>`
    })

    return dataInfoList

}

