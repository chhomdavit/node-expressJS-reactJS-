const db = require('../config/db.config');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {isEmptyOrNull} = require("../util/service");

require('dotenv').config();

var dataCarts = [
    {
        id : 101,
        name : 'Jean',
        customer_user_id:10
    },
    {
        id : 102,
        name : 'Car1',
        customer_user_id:2
    },
    {
        id : 103,
        name : 'Car2',
        customer_user_id:3
    },
    {
        id : 104,
        name : 'Car3',
        customer_user_id:10
    }
]


const getList = (req,res) =>{
    var sqlSelect = 'SELECT * FROM `customer_user`'
    db.query(sqlSelect,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                list_customerUser: results
            })
        }
    })
}


const create = (req,res) =>{
    var {name, tel, password, image_customer_user} = req.body
    var message ={}

    if(isEmptyOrNull(name)){
        message.name = "please fill in name !"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "please fill in tel !"
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
    var image_customer_user = null
    if(req.file){
        image_customer_user= req.file.filename
    }
    var password = bcrypt.hashSync(password,10)
    var sqlInsert = "INSERT INTO `customer_user`(`name`, `tel`, `password`, `image_customer_user`) VALUES (?,?,?,?)"
    var paramSql = [name, tel, password, image_customer_user]
    db.query(sqlInsert,paramSql,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message: 'Customer User is Insert success'
            })
        }
    })
}

const getCart = (req,res) =>{
    var authorization = req.headers.authorization;
    var token_from_clien = null
    if(authorization != null && authorization != ""){
        token_from_clien = authorization.split(" ")
        token_from_clien = token_from_clien[1]
    }
    
    if(token_from_clien == null){
        res.json({
            error: true,
            message: 'you have permission access this method'
        })
    }else{
        jwt.verify(token_from_clien,process.env.KEY_ACCESS_TOKEN,(error,results)=>{
            if(error){
                res.json({
                    error: true,
                    message: "Invalid token"
                })
            }else{
                var customer_user_id = results.profileCustomer.customer_user_id
                db.query("SELECT * FROM `cart`" ,(error1,results1)=>{
                    if(error){
                        res.json({
                            error1:true,
                            message:error1
                        })
                    }else{
                        res.json({
                            Cart: results1
                        })
                    }
                })
                // "SELEC * FROM Cart where Customer = customer_id 
                // var cart = dataCarts.filter((item,index)=>item.customer_user_id == customer_user_id)
                // res.json({
                //     Cart : cart,
                // })
            }
        })
    }
}

const login = (req,res) =>{
    var { tel, password } = req.body;
    var message = {}

    if (isEmptyOrNull(tel)) {
        message.tel = "please fill in tel !"
    }
    if (isEmptyOrNull(password)) {
        message.password = "please fill in password !"
    }
    db.query("SELECT * FROM `customer_user` WHERE 	tel = ?",[tel], (error, results) => {
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
                    var token = jwt.sign({profileCustomer:data},process.env.KEY_ACCESS_TOKEN)
                    res.json({
                        message : "Login success!",
                        is_loginCustomer : true,
                        profileCustomer : data,
                        tokenCustomer : token
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
    var {customer_user_id ,name, tel, password, image_customer_user} = req.body
    var message ={}

    if(isEmptyOrNull(name)){
        message.name = "please fill in name !"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "please fill in tel !"
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
    var image_customer_user = null
    if(req.file){
        image_customer_user= req.file.filename
    }
    var password = bcrypt.hashSync(password,10)
    var sqlInsert = "UPDATE `customer_user` SET `name`=?,`tel`=?,`password`=?,`image_customer_user`=IFNULL (?,image_customer_user) WHERE `customer_user_id`=?"
    var paramSql = [name, tel, password, image_customer_user,customer_user_id]
    db.query(sqlInsert,paramSql,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message: 'Customer User is Update success'
            })
        }
    })
}

const remove = (req,res) =>{ 
    var {id} = req.params
   var splDelete = "DELETE FROM `customer_user` WHERE customer_user_id =?"
   db.query(splDelete,[id],(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message: "Product Delete success!"
            })
        }
   })
}
module.exports = {
    getList,
    create,
    login,
    update,
    remove,
    getCart,
}