import {renderSection  } from './pages.js'

let techniquesData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    techniquesData = data.filter( dataPoint => dataPoint.quadrant === "techniques")
    assemble(techniquesData)
    
});

function assemble(data){
    const main = `
    <main class="wrap-quadrant"> 
        <div class="link-pages-container">${renderSection( "#008080", data )} </div>
    </main>`

    const renderpage = document.getElementById("techniquesQuad")
    renderpage.innerHTML = main
}