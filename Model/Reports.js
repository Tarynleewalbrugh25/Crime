import { connection as db} from "../Config/index.js";


class Reports{
    fetchReports(req, res){
        const qry = `
        SELECT reportID, Id, experience, crimeType, crimePlace, crimeTime, susAmount, susClothes, weapons, vehicle, injuries, stolenGoods, susDirection, authorities
        FROM Reports;
        `
        db.query(qry, (err, results)=>{
            if(err){
                res.json({
                    status: 404,
                    msg: err.message
                })
            }else {
                res.json({
                    status: res.statusCode,
                    results
                })
            }
            
        })
    }
}
export{
    Reports
}