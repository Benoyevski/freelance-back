const { Router } = require("express");
const router = Router();
const { user } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/users", user.getStudents);

router.post("/login", user.login);
router.post("/auth", user.auth);

router.patch("/user/:id", user.updateStudent);
router.patch("/users/changeprice/:id", user.chanPrice);
router.delete("/user/:id", user.deleteStudent);

module.exports = router;
