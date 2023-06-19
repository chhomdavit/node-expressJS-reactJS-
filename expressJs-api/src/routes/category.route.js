const {upload} = require("../util/service")
const controller = require ('../controllers/category.controller');

const category = (app) =>{
    app.get("/api/category/getList",controller.getList);
    app.post("/api/category/create",upload.single("image_category"),controller.create);
    app.put("/api/category/update",upload.single("image_category"),controller.update);
    app.delete("/api/category/remove/:id",controller.remove);
}
module.exports = category;