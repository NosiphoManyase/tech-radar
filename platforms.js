import {renderSection  } from './pages.js'

let platformsData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    platformsData = data.filter( dataPoint => dataPoint.quadrant === "platforms")
    assemble(platformsData)
    
});

function assemble(data){
    const main = `
    <main class="wrap-quadrant"> 
        <div class="link-pages-container">${renderSection( "#FF5733", data )} </div>
    </main>`

    const renderpage = document.getElementById("platformsQuad")
    renderpage.innerHTML = main
}