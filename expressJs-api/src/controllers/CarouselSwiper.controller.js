const db = require('../config/db.config');
const {isEmptyOrNull} = require("../util/service");


const getList = (req,res) =>{
    var sqlSelect = "SELECT * FROM `carousel_swiper`"
    db.query(sqlSelect,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                list_carouselSwiper : results
            })
        }
    })
}


const create = (req,res) =>{
    var {image_carousel, tittle, desc} = req.body
    var message ={}
    if(isEmptyOrNull(tittle)){
        message.tittle = "please fill in tittle !"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var image_carousel = null
    if(req.file){
        image_carousel= req.file.filename
    }
    var sqlInsert = "INSERT INTO `carousel_swiper`(`image_carousel`, `tittle`, `desc`) VALUES (?,?,?)"
    var paramInsert = [image_carousel, tittle, desc]
    db.query(sqlInsert,paramInsert,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message: "Carousel Swiper is insert success"
            })
        }
    })
}

const update = (req,res) =>{
    var {carousel_swiper_id,image_carousel, tittle, desc} = req.body
    var message ={}
    if(isEmptyOrNull(tittle)){
        message.tittle = "please fill in tittle !"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var image_carousel = null
    if(req.file){
        image_carousel= req.file.filename
    }
    var sqlUpdate = "UPDATE `carousel_swiper` SET `image_carousel`=IFNULL(?,image_carousel),`tittle`=?,`desc`=? WHERE carousel_swiper_id=?"
    var paramUpdate = [image_carousel, tittle, desc,carousel_swiper_id]
    db.query(sqlUpdate,paramUpdate,(error,results)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message: "Carousel Swiper is Update success"
            })
        }
    })
}

const remove = (req,res) =>{ 
   var {id} = req.params
   var splDelete = "DELETE FROM `carousel_swiper` WHERE carousel_swiper_id =?"
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