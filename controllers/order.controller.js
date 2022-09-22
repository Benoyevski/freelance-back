const Order = require("../models/Order.model");
const User = require("../models/User.model");
module.exports.orderController = {
  getOrder: async (req, res) => {
    const data = await Order.find({});
    res.json(data);
  },

  addOrder: async (req, res) => {
    const {
      categoryId,
      creator,
      price,
      text,
      workTime,
      freelancers,
      accepted,
    } = req.body;
    const data = await Order.create({
      categoryId,
      creator,
      price,
      text,
      workTime,
      freelancers,
      accepted,
    });
    return res.json(data);
  },
  deleteOrder: async (req, res) => {
    const data = await Order.findByIdAndDelete(req.params.id);
    return res.json("Удален");
  },

  patchOrder: async (req, res) => {
    const { categoryId, creator, price, text, workTime } = req.body;
    const data = await Order.findByIdAndUpdate(req.params.id, {
      categoryId,
      creator,
      price,
      text,
      workTime,
    });
    return res.json(data);
  },

  // подписка на задание
  followOrder: async (req, res) => {
    const user = await User.findById(req.body.user);
    const order = await Order.findById(req.params.id);
    try {
      if (String(order.creator) === String(user._id)) {
        return res.json("Выберите исполнителя для своего задания");
      } else if (order.freelancers.find((item) => String(item) == user._id)) {
        return res.json(
          "Вы уже отозвались на это задание. Дождитесь пока заказчик примет вашу заявку"
        );
      }
      await order.updateOne({ $addToSet: { freelancers: user._id } });
      await user.updateOne({ $addToSet: { followOrders: order._id } });
      res.json(order);
    } catch (error) {
      res.json(error + "Ошибка при подписке");
    }
  },
};
