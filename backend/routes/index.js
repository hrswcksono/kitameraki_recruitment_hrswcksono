const route = require("express").Router();
const controller = require("../controllers");

route.get("/api", controller.readCtrl);
route.post("/api", controller.createCtrl);
route.put("/api/:id", controller.updateCtrl);
route.delete("/api/:id", controller.deleteCtrl);

module.exports = route;
