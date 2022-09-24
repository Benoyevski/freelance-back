const { Router } = require("express");
const router = Router();
const { orderController } = require("../controllers/order.controller");

router.get("/order", orderController.getOrder);

router.post("/order", orderController.addOrder);

router.delete("/order/:id", orderController.deleteOrder);

router.patch("/order/:id", orderController.patchOrder);
router.patch("/followOrder/:id", orderController.followOrder);
router.patch('/unFollow/:id', orderController.unFollow)

module.exports = router;
