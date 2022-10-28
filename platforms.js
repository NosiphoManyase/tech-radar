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
  const platformsData = data.filter( dataPoint => dataPoint.quadrant === "platforms")
    setSinglePageHtml(platformsData, 
      'Platforms', 
      "platformsQuad",  
      "./imgs/top-right.svg",
      "#ffbe28",
      ["bottom","left" ]
      , true)
  
  
}

