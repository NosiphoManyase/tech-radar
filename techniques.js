import {setSinglePageHtml} from './linkedPages.js'
import { useExcelFetcher } from "./useExcelFetcher.js"

getData()

async function getData(){
  let data = []

  try {
    data = await useExcelFetcher()
    
  } catch (err) {
    console.error('Could not parse json', err)
  }
  const techniquesData = data.filter( dataPoint => dataPoint.quadrant === "techniques")
  setSinglePageHtml(techniquesData, 
    "Techniques", 
    "techniquesQuad", 
    "./imgs/bottom-right.svg",
    "#35c8c1",
    ["top","left"]
    , true)
  
  
}
