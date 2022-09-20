const Category = require('../models/Category.model')

module.exports.category = {
    getCategory: async (req, res) => {
        const data = await Category.find({})
        res.json(data)
    },
    addCategory: async (req, res) => {
        const data = await Category.create({
            category: req.body.category
        })
        res.json(data)
    },
    updateCategory: async (req, res) => {
        const data = await Category.findByIdAndUpdate(req.params.id, req.body.category)
        res.json(data)
    },
    deleteCategory: async (req, res) => {
        const data = await Category.findByIdAndDelete(req.params.id)
        res.json(data)
    },
}