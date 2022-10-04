import {assemble} from './linkedPages.js'

let languagesData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    languagesData = data.filter( dataPoint => dataPoint.quadrant === "languages and frameworks")
    assemble(languagesData, "Languages And Frameworks",  "langAndFrameworksQuad", "#93C572")
    
});

