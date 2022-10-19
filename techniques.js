import {assemble} from './linkedPages.js'

let techniquesData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    techniquesData = data.filter( dataPoint => dataPoint.quadrant === "techniques")
    assemble(techniquesData, 
      "Techniques", 
      "techniquesQuad", 
      "./imgs/bottom-right.svg",
      "#35c8c1",
      ["top","left"] )
    
});
