import {renderSection  } from './pages.js'

let languagesData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    languagesData = data.filter( dataPoint => dataPoint.quadrant === "languages and frameworks")
    assemble(languagesData)
    
});

function assemble(data){
    const main = `<div class="languagesAside"> ${renderSection( "#93C572", languagesData )}</div>`

    const renderpage = document.getElementById("langAndFrameworksQuad")
    renderpage.innerHTML += main
}

