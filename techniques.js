import {assemble} from './linkedPages.js'

let techniquesData = []

fetch("https://tech-radar-api.herokuapp.com/tech-radar")
  .then((response) => response.json())
  .then((data) => {
    techniquesData = data.filter( dataPoint => dataPoint.quadrant === "techniques")
    assemble(techniquesData, "Techniques", "techniquesQuad", "#93C572")
    
});
