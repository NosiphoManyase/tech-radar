import {setSinglePageHtml} from './linkedPages.js'

let platformsData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    platformsData = data.filter( dataPoint => dataPoint.quadrant === "platforms")
    setSinglePageHtml(platformsData, 
      'Platforms', 
      "platformsQuad",  
      "./imgs/top-right.svg",
      "#ffbe28",
      ["bottom","left" ]
      , true)
});

