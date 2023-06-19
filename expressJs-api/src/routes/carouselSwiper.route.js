const {upload} = require("../util/service")
const controller = require ('../controllers/CarouselSwiper.controller');

const carouselSwiper = (app) =>{
    app.get("/api/carouselSwiper/getList",controller.getList);
    app.post("/api/carouselSwiper/create",upload.single("image_carousel"),controller.create);
    app.put("/api/carouselSwiper/update",upload.single("image_carousel"),controller.update);
    app.delete("/api/carouselSwiper/remove/:id",controller.remove);
}
module.exports = carouselSwiper;