const multer = require("multer")
const image_path = "C:/xampp/htdocs/image_path/"
const storage = multer.diskStorage({
    destination : function (req,file,callback){
        callback(null,image_path)
    }
})
const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024*1024*3
    }
})

const controller = require ('../controllers/user.controller');

const user = (app) =>{
    app.get("/api/user/getList",controller.getList);
    app.post("/api/user/create",upload.single("adminUser_avarta"),controller.create);
    app.post("/api/user/login",controller.login);
    app.put("/api/user/update",upload.single("adminUser_avarta"),controller.update);
    app.delete("/api/user/remove/:id",controller.remove);
}
module.exports = user;