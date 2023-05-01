const db = require('../config/db.config');
const isEmptyOrNull = require("../util/service");

const getList = (req,res) =>{
    var sqlSelect = "SELECT * FROM user "
        sqlSelect +="ORDER BY user_id DESC "
    db.query(sqlSelect,(error,results)=>{
        res.json({
            data_user : results
        })
    })
}

const getOne = (req,res) =>{
    var {id} = req.params
    if(isEmptyOrNull(id)){
        res.json({
            error: true,
            message: {
                id: "Please fill in params id"
            }
        })
    }
    var sqlSelect = "SELECT * FROM user WHERE `user_id`=?";
    db.query(sqlSelect,[id],(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                data_user: results
            })
        }
    })
}

const create = (req,res) =>{
    var {firstname,lastname,gender,dob,userEmail,password,status} = req.body
    var message= {}
    if(isEmptyOrNull(firstname)){
        message.firstname = "please fill in firstname !"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "please fill in lastname !"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "please fill in lastname !"
    }
    if(isEmptyOrNull(userEmail)){
        message.userEmail = "please fill in userEmail !"
    }
    if(isEmptyOrNull(password)){
        message.password = "please fill in password !"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var image_avarta = null
    if(req.file){
        image_avarta = req.file.filename
    }
    var sqlInsert = "INSERT INTO `user`(`firstname`,`lastname`,`gender`,`dob`,`userEmail`,`password`,`image_avarta`,`status`) VALUES (?,?,?,?,?,?,?,?)";
    var paramSql = [firstname,lastname,gender,dob,userEmail,password,image_avarta,status]
    db.query(sqlInsert,paramSql,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message : "User inserted !!",
                data_user: results
            })
        }
    })  
}

const update = (req,res) =>{
    var {firstname,lastname,gender,dob,userEmail,password,image_avarta,status,user_id} = req.body
    var message= {}
    if(isEmptyOrNull(firstname)){
        message.firstname = "please fill in firstname !"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "please fill in lastname !"
    }
    if(isEmptyOrNull(userEmail)){
        message.userEmail = "please fill in userEmail !"
    }
    if(isEmptyOrNull(password)){
        message.password = "please fill in password !"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sqlUpdate = "UPDATE `user` SET `firstname`=?,`lastname`=?,`gender`=?,`dob`=?,`userEmail`=?,`password`=?,`image_avarta`=?,`status`=? WHERE `user_id`=?";
    var paramSql = [firstname,lastname,gender,dob,userEmail,password,image_avarta,status,user_id]
    db.query(sqlUpdate,paramSql,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message : "User update !!",
                data_user: results
            })
        }
    })  
}

const remove = (req,res) =>{
    var id = req.params.id
    var sqlDelete = "DELETE FROM `user` WHERE user_id = "
    db.query(sqlDelete + id,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            if(results.affectedRows !=0){
                res.json({
                    message : "Customer Deleted!",
                    data_user : results
                })
            }else{
                res.json({
                    message: "Delete not complete",
                    data_user: results
                })
            }
        }
    })
}
module.exports = {
    getList,
    getOne,
    create,
    update,
    remove,
}