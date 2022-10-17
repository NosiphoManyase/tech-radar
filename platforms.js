import {assemble} from './linkedPages.js'

let platformsData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    platformsData = data.filter( dataPoint => dataPoint.quadrant === "platforms")
    assemble(platformsData, 
      'Platforms', 
      "platformsQuad",  
      "./imgs/top-right.svg",
      "#ffbe28")
});

