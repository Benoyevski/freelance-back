const { Router } = require("express");
const router = Router();
const {category} = require('../controllers/category.controller')


router.get('/categories', category.getCategory)
router.post('/category', category.addCategory)
router.patch('/category/:id', category.updateCategory)
router.delete('/category/:id', category.deleteCategory)

module.exports = router