import {assemble} from './linkedPages.js'

let toolsData = []

//investigate 31

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    toolsData = data.filter( dataPoint => dataPoint.quadrant === "tools")
    assemble(toolsData, 
      "Tools", 
      "toolsQuad", 
      "./imgs/bottom-left.svg",
      "#7472f5",
      ["top","right"] )
    
});

