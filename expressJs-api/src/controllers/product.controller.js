const db = require('../config/db.config');
const {isEmptyOrNull} = require("../util/service");


// SELECT p.*, c.name as category_name FROM product p INNER JOIN category c ON p.category_id = c.category_id;
const getList = async (req,res) =>{
    var sqlSelect =" SELECT "+ 
                   " p.*, "+ 
                   " c.name as category_name "+ 
                   " FROM product p "+
                   " INNER JOIN category c ON p.category_id = c.category_id "
    var list_category = await db.query("SELECT * FROM category")
    db.query(sqlSelect,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                list_product: results,
                list_category: list_category
            })
        }
    })
}


const create = (req,res) =>{
  var { category_id, name, barcode, price, quantity, image_1, image_2,image_3, image_4, description, status, create_at, create_by} = req.body
  var message = {}
    if(isEmptyOrNull(category_id)){
        message.category_id = "please fill in category_id !"
    }
    if(isEmptyOrNull(name)){
        message.name = "please fill in name !"
    }
    if(isEmptyOrNull(barcode)){
        message.barcode = "please fill in barcode !"
    }
    if(isEmptyOrNull(price)){
        message.price = "please fill in price !"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "please fill in quantity !"
    }
    if(isEmptyOrNull(create_by)){
        message.create_by = "please fill in create_by !"
    }
    if(Object.keys(message).length > 0){
     res.json({
        error: true,
        message: message
    })
        return
    }
    var image_1 = null
    if(req.files){
        image_1 = req.files.image_1[0].filename
    }
    var image_2 = null
    if(req.files){
        image_2 = req.files.image_2[0].filename
    }
    var image_3 = null
    if(req.files){
        image_3 = req.files.image_3[0].filename
    }
    var image_4 = null
    if(req.files){
        image_4 = req.files.image_4[0].filename
    }
    var sqlInsert ="INSERT INTO `product`(`category_id`, `name`, `barcode`, `price`, `quantity`, `image_1`,`image_2`,`image_3`,`image_4`,`description`, `status`, `create_at`, `create_by`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
    var paramSql = [category_id, name, barcode, price, quantity, image_1, image_2,image_3, image_4, description, status, create_at, create_by]
    db.query(sqlInsert,paramSql,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message : "Product Insert success!"
            })
        }
    })
}

const update = (req,res) =>{
    var { product_id, category_id, name, barcode, price, quantity, image_1, image_2,image_3, image_4, description, status, create_at, create_by} = req.body
  var message = {}
    if(isEmptyOrNull(category_id)){
        message.category_id = "please fill in category_id !"
    }
    if(isEmptyOrNull(name)){
        message.name = "please fill in name !"
    }
    if(isEmptyOrNull(barcode)){
        message.barcode = "please fill in barcode !"
    }
    if(isEmptyOrNull(price)){
        message.price = "please fill in price !"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "please fill in quantity !"
    }
    if(isEmptyOrNull(create_by)){
        message.create_by = "please fill in create_by !"
    }
    if(Object.keys(message).length > 0){
     res.json({
        error: true,
        message: message
    })
        return
    }
    var image_1 = null
    if(req.files){
        image_1 = req.files.image_1[0].filename
    }
    var image_2 = null
    if(req.files){
        image_2 = req.files.image_2[0].filename
    }
    var image_3 = null
    if(req.files){
        image_3 = req.files.image_3[0].filename
    }
    var image_4 = null
    if(req.files){
        image_4 = req.files.image_4[0].filename
    }
    var sqlUpdate ="UPDATE `product` SET `category_id`=?,`name`=?,`barcode`=?,`price`=?,`quantity`=?,`image_1`=IFNULL(?,image_1),`image_2`=IFNULL(?,image_2),`image_3`=IFNULL(?,image_3),`image_4`=IFNULL(?,image_4),`description`=?,`status`=?,`create_at`=?,`create_by`=? WHERE `product_id`=?"
    var paramSql = [category_id, name, barcode, price, quantity, image_1, image_2,image_3, image_4, description, status, create_at, create_by,product_id]
    db.query(sqlUpdate,paramSql,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message : "Product Update success!"
            })
        }
    })
}

const remove = (req,res) =>{ 
   var {id} = req.params
   var splDelete = "DELETE FROM `product` WHERE product_id =?"
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
    update,
    remove,
}