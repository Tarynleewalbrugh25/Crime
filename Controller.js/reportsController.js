import express from "express";
// import bodyParser from "body-parser";
import { reports } from "../Model/index.js";


const reportRouter = express.Router()
//fetch all reports
reportRouter.get('/', (req, res)=>{
    try {
        reports.fetchReports(req, res)
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "An error occured while trying to fetch Reports"
        })
    }
})
// fetch a single report
reportRouter.get('/:id', (req, res)=>{
    try {
        reports.fetchReport(req, res)
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve this report"
        })
    }
})

export{
    reportRouter, express
}