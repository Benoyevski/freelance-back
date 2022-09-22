const Order = require("../models/Order.model")

module.exports.orderController = {
    getOrder: async (req,res)=>{
        const data = await Order.find({})
        res.json(data)
    },

    addOrder :async (req,res)=>{
        const {categoryId,creator,price,text,workTime,title,location}= req.body
        const data = await Order.create({
            categoryId,creator,price,text,workTime,title,location

        })
        return res.json(data)
    },
    deleteOrder: async (req,res)=>{
        const data = await Order.findByIdAndDelete(req.params.id)
        return res.json("Удален")
    },

    patchOrder: async (req,res)=>{
        const {categoryId,creator,price,text,workTime}= req.body
        const data = await Order.findByIdAndUpdate(req.params.id,{
            categoryId,creator,price,text,workTime

        })
        return res.json(data)
    }
}