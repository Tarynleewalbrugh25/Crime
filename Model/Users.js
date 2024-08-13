import { connection as db} from "../Config/index.js";
import { hash, compare } from "bcrypt"
class Users{
    fetchUsers(req, res){
        const qry = `
        SELECT Id, firstName, lastName, emailAddress, cellPhone, Pass, userRole
        FROM Users;
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
    fetchUser(req, res){
        const qry = `
        SELECT Id, firstName, lastName, emailAddress, cellPhone, Pass, userRole
        FROM Users;
        WHERE Id = ?;
        `
        db.query(qry, [req.params.id], (err, result)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                result: result[0]
            })
        })
    }
    async createUser(req, res){
        let data = req.body
        data.Pass = await hash(data?.Pass, 8)
        let user = {
            emailAddress: data.emailAddress,
            Pass: data.Pass
        }
        const qry = `
        INSERT INTO Users SET ?; 
        `
        db.query(qry, [data], (err)=>{
            if (err){
                res.json({
                    status: res.statusCode,
                    msg: "This email address is already in use"
                })
            }else{
                let token = createToken(user)
                res.json({
                    status: res.statusCode,
                    token,
                    msg: 'You\'re registered'
                })
            }
        })
    }
    async deleteUser(req, res){
        const qry = `
        Delete FROM Users
        WHERE Id = ?;
        `
        db.query(qry,[req.params.id], (err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "This User was deleted"
            })
        })
    }
    async updateUser(req, res){
        const data = req.body
        if(data?.Pass){
            data.Pass = await hash(data?.Pass, 8)
        }
        const qry = `
        UPDATE Users
        SET ?
        WHERE Id = ${req.params.id}
        `
        db.query(qry, [data], (err)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "This user was updated"
            })
        })
    }
    
    login(req, res){
        const {emailAddress, Pass} = req.body
        const qry = `
        SELECT Id, firstName, lastName, emailAddress, cellPhone, Pass, userRole
        FROM Users;
        WHERE emailAddress = ?;
        `
        db.query(qry, [emailAddress], async(err, result)=>{
            if (err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode,
                    msg: "Wrong email address provided"
                })
            }else{
                const validPass = await compare(Pass, result[0].Pass)
                if(validPass){
                    const token = createToken({
                        Id:result[0].Id,
                        emailAddress,
                        Pass,
                        userRole:result[0].userRole
                    })
                    res.json({
                        status: res.statusCode,
                        msg: "you're logged in",
                        token,
                        result: result[0]
                    })
                }else{
                    res.json({
                        status: res.statusCode,
                        msg: "Please provide the correct password"
                    })
                }
            }
        })
    }
}
export{
    Users
}