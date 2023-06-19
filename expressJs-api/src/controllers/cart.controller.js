const db = require('../config/db.config');
const jwt = require("jsonwebtoken")
const {isEmptyOrNull} = require("../util/service");


const getList = (req,res) =>{
    var sql = "SELECT "+
    " c.* , cu.name, p.name as p_name, p.image_1 as p_image_1 "+
    " FROM cart c "+
    " INNER JOIN customer_user cu ON c.customer_user_id = cu.customer_user_id "+
    " INNER JOIN product p ON c.product_id = p.product_id "
    db.query(sql,(error,results)=>{
        if(!error){
            res.json({
                list_cart: results
            })
        }else{
            res.json({
                error: true,
                message : error
            })
        }
    })
}

const getCartByCustomer = (req,res) =>{
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
                var {id} = req.params
                var sqlSelect = "SELECT c.*, p.name as p_name, p.image_1 as p_image_1 "+ 
                " FROM cart as c "+
                " INNER JOIN product as p ON c.product_id = p.product_id "+
                " WHERE c.customer_user_id = ? "
                db.query(sqlSelect,[id],(error,results)=>{
                    var cart = customer_user_id === customer_user_id
                    if(error){
                        res.json({
                            error: true,
                            message: error
                        })
                    }else{
                        res.json({
                            List : results,
                            cart_id : cart
                        })
                    }
                })
            }
        })
    }
}

const create = (req,res) =>{
   
}

const update = (req,res) =>{
 
}

const remove = (req,res) =>{ 
    
}
module.exports = {
    getList,
    create,
    update,
    remove,
    getCartByCustomer,
}