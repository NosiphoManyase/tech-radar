import {renderSection  } from './pages.js'

let languagesData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    languagesData = data.filter( dataPoint => dataPoint.quadrant === "languages and frameworks")
    assemble(languagesData)
    
});

function assemble(data){
    const main = `
    <main class="wrap-quadrant"> 
        <div class="link-pages-container">${renderSection( "#93C572", languagesData )} </div>
    </main>`

    const renderpage = document.getElementById("langAndFrameworksQuad")
    renderpage.innerHTML = main
}

