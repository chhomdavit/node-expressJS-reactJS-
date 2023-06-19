const {upload} = require("../util/service")
const controller = require ('../controllers/customerUser.controller');

const customerUser = (app) =>{
    app.get("/api/customerUser/getList",controller.getList);
    app.get("/api/customerUser/getCart",controller.getCart);
    app.post("/api/customerUser/create",upload.single("image_customer_user"),controller.create);
    app.post("/api/customerUser/login",controller.login);
    app.put("/api/customerUser/update",upload.single("image_customer_user"),controller.update);
    app.delete("/api/customerUser/remove/:id",controller.remove);
}
module.exports = customerUser;