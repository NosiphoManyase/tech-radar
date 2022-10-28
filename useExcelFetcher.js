const HOLDINGS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT57zBNc5Bg6Oudh3NsGDutIq9ba3qpGssvWKHn2aSkg3OGBMA8MdEtVD9-6euqeYd-qMKpMW-KMBve/pub?gid=0&single=true&output=csv";

export function useExcelFetcher(){
  
  return new Promise((resolve, reject) => {

    Papa.parse(HOLDINGS_URL, {
      download: true,
      header: true,
      complete: function (results){
        resolve(results.data)
      },
      error: function (err) {
        reject(err)
      }
    })
  })

}


