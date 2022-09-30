import {renderSection  } from './pages.js'

let toolsData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    toolsData = data.filter( dataPoint => dataPoint.quadrant === "tools")
    assemble(toolsData)
    
});

function assemble(data){
    const main = `
    <main class="wrap-quadrant"> 
        <div class="link-pages-container">${renderSection( "#FFC300", toolsData )} </div>
    </main>`

    const renderpage = document.getElementById("toolsQuad")
    renderpage.innerHTML = main
}