const {upload} = require("../util/service")
const controller = require ('../controllers/product.controller');

const cpUpload = upload.fields([
    { name: 'image_1', maxCount: 1 }, 
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 },
    { name: 'image_4', maxCount: 1 },
])

const product = (app) =>{
    app.get("/api/product/getList",controller.getList);
    app.post("/api/product/create",cpUpload,controller.create);
    app.put("/api/product/update",cpUpload,controller.update);
    app.delete("/api/product/remove/:id",controller.remove);
}
module.exports = product;