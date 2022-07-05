import { technologies } from "./data.js"

import express from 'express'
const app = express()

const data = technologies

app.get('/tech-radar', (req, res) =>{
    req.body = data
})

app.listen(3000)