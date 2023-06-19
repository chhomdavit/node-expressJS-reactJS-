const db = require('../config/db.config');
const {isEmptyOrNull} = require("../util/service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require('dotenv').config();



const getList = (req,res) =>{
    var sqlSelect = "SELECT * FROM admin_user"
    db.query(sqlSelect,(error,results)=>{
        res.json({
            data_admin_user : results
        })
    })
}


const create = (req,res) =>{
    var {firstname, lastname, gender, dob, userEmail, password, adminUser_avarta, status, create_at} = req.body
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
    var adminUser_avarta = null
    if(req.file){
        adminUser_avarta = req.file.filename
    }
    
    var password = bcrypt.hashSync(password,10)
    var sqlInsert = "INSERT INTO `admin_user`( `firstname`, `lastname`, `gender`, `dob`, `userEmail`, `password`, `adminUser_avarta`, `status`, `create_at`) VALUES (?,?,?,?,?,?,?,?,?)";
    var paramSql = [firstname, lastname, gender, dob, userEmail, password, adminUser_avarta, status, create_at]
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

const login = (req,res) =>{
    var { userEmail, password } = req.body;
    var message = {}

    if (isEmptyOrNull(userEmail)) {
        message.userEmail = "please fill in userEmail !"
    }
    if (isEmptyOrNull(password)) {
        message.password = "please fill in password !"
    }
    db.query("SELECT * FROM `admin_user` WHERE userEmail = ?",[userEmail], (error, results) => {
        if (error) {
            res.json({
                error: true,
                message: error
            })
        } else {
            if (results.length == 0) {
                res.json({
                    error: true,
                    message: "User dose not exist. Please register!"
                })
            } else {
                var data = results[0]
                var passwordInDb = data.password
                var isCorrectPassword = bcrypt.compareSync(password, passwordInDb)
                if (isCorrectPassword) {
                    delete data.password;
                    var token = jwt.sign({profile:data},process.env.KEY_ACCESS_TOKEN)
                    res.json({
                        is_login : true,
                        message : "Login success!",
                        profile : data,
                        token : token
                    })
                } else {
                    res.json({
                        error: true,
                        message: "Incorrect password"
                    })
                }
            }
        }
    })
}

const update = (req,res) =>{
    var{admin_user_id, firstname, lastname, gender, dob, userEmail, password, adminUser_avarta, status, create_at} =req.body
    var message = {}
    if(isEmptyOrNull(admin_user_id)){
        message.admin_user_id = "please fill in admin_user_id !"
    }
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
    var adminUser_avarta = null
    if(req.file){
        adminUser_avarta = req.file.filename
    }
    var sqlUpdat="UPDATE `admin_user` SET `firstname`=?,`lastname`=?,`gender`=?,`dob`=?,`userEmail`=?,`password`=?,`adminUser_avarta`=IFNULL(?,adminUser_avarta),`status`=?,`create_at`=? WHERE `admin_user_id`=?"
    var paramSql=[firstname, lastname, gender, dob, userEmail, password, adminUser_avarta, status, create_at,admin_user_id]
    db.query(sqlUpdat,paramSql,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message: "admin_user update success"
            })
        }
    })
}

const remove = (req,res) =>{ 
   db.query("DELETE FROM `admin_user` WHERE admin_user_id ="+req.params.id,(error,results)=>{
    if(error){
        res.json({
            error: true,
            message: error
        })
    }else{
        if(results.affectedRows !=0){
            res.json({
                message: "Deleted",
                data:results
            })
        }else{
            res.json({
                message: "Delete not complete"
            })
        }
    }
   })
}
module.exports = {
    getList,
    create,
    update,
    remove,
    login,
}