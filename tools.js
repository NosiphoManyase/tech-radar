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
  const toolsData = data.filter( dataPoint => dataPoint.quadrant === "tools")
  setSinglePageHtml(toolsData, 
    "Tools", 
    "toolsQuad", 
    "./imgs/bottom-left.svg",
    "#7472f5",
    ["top","right"]
    , true)
  
  
}

