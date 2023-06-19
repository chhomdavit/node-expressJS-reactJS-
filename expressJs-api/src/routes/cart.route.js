const {upload} = require("../util/service")
const controller = require ('../controllers/cart.controller');

const cart = (app) =>{
    app.get("/api/cart/getList",controller.getList);
    app.get("/api/cart/getCartByCustomer/:id",controller.getCartByCustomer);
    app.post("/api/cart/create",upload.single(""),controller.create);
    app.put("/api/cart/update",upload.single(""),controller.update);
    app.delete("/api/cart/remove/:id",controller.remove);
}
module.exports = cart;