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
  const languagesData = data.filter( dataPoint => dataPoint.quadrant === "languages and frameworks")
  
  setSinglePageHtml(languagesData, 
    "Languages And Frameworks",  
    "langAndFrameworksQuad", 
    "./imgs/top-left.svg",
    "#00baeb",
    ["bottom","right" ]
    , false)
  
  
}
