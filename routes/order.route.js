const { Router } = require("express");
const router = Router();
const { orderController } = require("../controllers/order.controller");

router.get("/order", orderController.getOrder);

router.post("/order", orderController.addOrder);

router.patch("/order/:id", orderController.patchOrder);
router.delete("/order/:id", orderController.deleteOrder);

router.patch("/followOrder/:id", orderController.followOrder);

module.exports = router;
