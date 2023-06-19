const db = require('../config/db.config');
const {isEmptyOrNull} = require("../util/service");


const getList = (req,res) =>{
    var sqlSelect = "SELECT * FROM category"
    db.query(sqlSelect,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                list_category:results
            })
        }
    })
}


const create = (req,res) =>{
    var{ name, description, parent_id,image_category, order_number, create_at, create_by} =req.body
    var message ={}

    if(isEmptyOrNull(name)){
        message.name = "please fill in name !"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var image_category = null
    if(req.file){
        image_category= req.file.filename
    }
    var sqlInsert = "INSERT INTO `category`(`name`, `description`, `parent_id`, `image_category`, `order_number`, `create_at`, `create_by`) VALUES (?,?,?,?,?,?,?)"
    var paramSql =[name, description, parent_id,image_category, order_number, create_at, create_by]
    db.query(sqlInsert,paramSql,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message: "Category is Insert success"
            })
        }
    })
}

const update = (req,res) =>{
    var{category_id, name, description, parent_id,image_category, order_number, create_at, create_by} =req.body
    var message ={}

    if(isEmptyOrNull(name)){
        message.name = "please fill in name !"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var image_category = null
    if(req.file){
        image_category= req.file.filename
    }
    var sqlUpdate = "UPDATE `category` SET `name`=? ,`description`=? ,`parent_id`=? ,`image_category`=IFNULL(?,image_category),`order_number`=? ,`create_at`=? ,`create_by`=? WHERE category_id =?"
    var paramSql =[name, description, parent_id,image_category, order_number, create_at, create_by,category_id]
    db.query(sqlUpdate,paramSql,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message: "Category is Update success"
            })
        }
    })
}

const remove = (req,res) =>{ 
    db.query("DELETE FROM `category` WHERE category_id ="+req.params.id,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            if(results.affectedRows !=0){
                res.json({
                    message: "Category is Delete success",
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
}